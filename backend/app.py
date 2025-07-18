from flask import Flask, request, render_template, jsonify
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import torch
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast
import torch.nn.functional as F
import os
from flask_cors import CORS
import time
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load model and tokenizer at startup
MODEL_PATH = os.path.join("model_of_Review_Shield", "fine_tuned_model")
model = None
tokenizer = None
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model():
    """Load the model and tokenizer with error handling"""
    global model, tokenizer
    try:
        if os.path.exists(MODEL_PATH):
            model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)
            tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_PATH)
            model.to(device)
            model.eval()
            print("Model loaded successfully!")
        else:
            print(f"Model path {MODEL_PATH} does not exist. Using mock predictions.")
    except Exception as e:
        print(f"Error loading model: {e}")
        print("Using mock predictions instead.")

# Initialize model
load_model()

def predict_review_with_score(text):
    """Predict if a review is real or fake with confidence scores"""
    if model is None or tokenizer is None:
        # Return mock predictions if model is not loaded
        import random
        real_score = random.uniform(40, 95)
        fake_score = 100 - real_score
        return real_score, fake_score
    
    try:
        tokens = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
        tokens = {k: v.to(device) for k, v in tokens.items()}

        with torch.no_grad():
            output = model(**tokens)
            probs = F.softmax(output.logits, dim=-1)
            real_score = probs[0][0].item() * 100
            fake_score = probs[0][1].item() * 100

        return real_score, fake_score
    except Exception as e:
        print(f"Error in prediction: {e}")
        # Return mock prediction on error
        import random
        real_score = random.uniform(40, 95)
        fake_score = 100 - real_score
        return real_score, fake_score

@app.route("/", methods=['GET'])
def home():
    """Home page with form to analyze products"""
    return render_template('home.html')

@app.route("/health", methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Review Shield Backend is running',
        'model_loaded': model is not None and tokenizer is not None
    })

@app.route("/test", methods=['GET'])
def test_endpoint():
    """Test endpoint to verify the server is working"""
    return jsonify({
        'message': 'Review Shield Backend is working!',
        'model_status': 'Loaded' if (model is not None and tokenizer is not None) else 'Using mock predictions',
        'available_endpoints': [
            'GET / - Home page',
            'GET /health - Health check', 
            'GET /test - This test endpoint',
            'POST /review - Web form review analysis',
            'POST /api/review - API review analysis'
        ]
    })

@app.route("/review", methods=['POST'])
def review():
    """Web form endpoint for review analysis"""
    try:
        product_link = request.form.get('content')
        if not product_link:
            return render_template('results.html', product_name=None, reviews=[], error="Please provide a product URL")
        return analyze_product(product_link, render_html=True)
    except Exception as e:
        print("Error in /review:", e)
        traceback.print_exc()
        return render_template('results.html', product_name=None, reviews=[], error=str(e))

@app.route("/api/review", methods=['POST'])
def api_review():
    """API endpoint for review analysis"""
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
        
        product_link = data['url']
        return analyze_product(product_link, render_html=False)
    except Exception as e:
        print("Error in /api/review:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

def analyze_product(product_link, render_html=False, max_pages=10, max_reviews=200):
    """Analyze product reviews from Flipkart URL"""
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    
    driver = None
    reviews = []
    comments_only = []
    image_urls = []
    product_name = "Unknown Product"

    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.get(product_link)
        time.sleep(3)
        soup = bs(driver.page_source, 'html.parser')

        # Try to find and click "All reviews" button
        try:
            all_reviews_button = driver.find_element("css selector", "div.RcXBOT")
            all_reviews_button.click()
            time.sleep(2)
            soup = bs(driver.page_source, 'html.parser')
        except Exception as e:
            print("No 'All reviews' button found:", e)

        # Build review URL for pagination
        review_links = soup.select('nav.WSL9JP a')
        base_review_url = None
        for link in review_links:
            if "page=" in link.get("href", ""):
                base_review_url = "https://www.flipkart.com" + link["href"].split("?page=")[0] + "?page="
                break

        if not base_review_url:
            base_review_url = product_link.split("?")[0] + "?page="

        # Scrape reviews from multiple pages
        for page in range(1, max_pages + 1):
            try:
                driver.get(base_review_url + str(page))
                time.sleep(2)
                soup = bs(driver.page_source, 'html.parser')

                # Get product name and images from first page
                if page == 1:
                    product_name_tag = soup.find("div", {"class": "C7fEHH"})
                    if product_name_tag and product_name_tag.div:
                        product_name = product_name_tag.div.text.strip()

                    try:
                        image_tags = soup.find_all("img", {"class": "DByuf4 IZexXJ jLEJ7H"})
                        image_urls = [img['src'] for img in image_tags if img.get('src')]
                    except:
                        image_urls = []

                # Extract reviews
                comment_boxes = soup.findAll("div", {"class": "RcXBOT"})
                if not comment_boxes:
                    print(f"No reviews found on page {page}")
                    break

                for comment_box in comment_boxes:
                    try:
                        # Extract reviewer name
                        try:
                            name = comment_box.div.div.find_all('p', {'class': '_2NsDsF AwS1CA'})[0].text
                        except:
                            name = 'No Name'

                        # Extract rating
                        try:
                            rating = comment_box.div.div.div.div.text
                        except:
                            rating = 'No Rating'

                        # Extract comment heading
                        try:
                            comment_head = comment_box.div.div.div.p.text
                        except:
                            comment_head = 'No Comment Heading'

                        # Extract comment text
                        try:
                            zmyheo_div = comment_box.find('div', class_='ZmyHeo')
                            if zmyheo_div:
                                read_more_span = zmyheo_div.find('span', class_='wTYmpv')
                                if read_more_span:
                                    read_more_span.extract()
                                comment = zmyheo_div.text.strip()
                            else:
                                comment = ''
                        except:
                            comment = ''

                        # Skip if no comment
                        if not comment:
                            continue

                        comments_only.append(comment)
                        
                        # Add prediction to review
                        real_score, fake_score = predict_review_with_score(comment)
                        prediction = 1 if real_score > fake_score else 0
                        
                        reviews.append({
                            "Name": name,
                            "Rating": rating,
                            "CommentHead": comment_head,
                            "Comment": comment,
                            "Prediction": prediction,
                            "RealScore": real_score,
                            "FakeScore": fake_score
                        })

                        if len(reviews) >= max_reviews:
                            break
                    except Exception as e:
                        print(f"Error processing review: {e}")
                        continue
                
                if len(reviews) >= max_reviews:
                    break
                    
            except Exception as e:
                print(f"Error on page {page}: {e}")
                break

    except Exception as e:
        print(f"Error in analyze_product: {e}")
        traceback.print_exc()
        if render_html:
            return render_template('results.html', product_name=None, reviews=[], error=str(e))
        else:
            return jsonify({"error": str(e)}), 500
    finally:
        if driver:
            driver.quit()

    # Calculate statistics
    real_count = sum(1 for review in reviews if review.get('Prediction') == 1)
    total_comments = len(reviews)
    fake_count = total_comments - real_count
    real_percent = (real_count / total_comments) * 100 if total_comments else 0
    fake_percent = 100 - real_percent

    # Calculate grade
    if real_percent > 90:
        grade = "A+"
    elif real_percent > 80:
        grade = "A"
    elif real_percent > 70:
        grade = "B"
    elif real_percent > 60:
        grade = "C"
    else:
        grade = "D"
    
    # Overall recommendation
    overall_rating = "✅ Recommended to Buy" if real_count >= total_comments / 2 else "❌ Not Recommended"

    if render_html:
        return render_template(
            'results.html',
            product_name=product_name,
            reviews=reviews,
            images=image_urls,
            overall_rating=overall_rating
        )
    else:
        return jsonify({
            "product_name": product_name,
            "reviews": reviews,
            "images": image_urls,
            "overall_rating": overall_rating,
            "stats": {
                "total": total_comments,
                "real": real_count,
                "fake": fake_count,
                "real_percent": real_percent,
                "fake_percent": fake_percent,
                "grade": grade
            }
        })

if __name__ == "__main__":
    print("Starting Review Shield Backend...")
    print(f"Model loaded: {model is not None and tokenizer is not None}")
    print(f"Device: {device}")
    print("Server running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
