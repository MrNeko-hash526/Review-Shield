import { useEffect, useState } from "react";
import ExcelJS from 'exceljs';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { 
  HiShieldCheck, 
  HiStar, 
  HiArrowPath as HiRefresh,
  HiTrash,
  HiExclamationTriangle,
  HiCheckCircle,
  HiXCircle,
  HiLink,
  HiSparkles,
  HiMagnifyingGlass,
  HiChartBar,
  HiGlobeAlt,
  HiArrowRight,
  HiArrowLeft,
  HiCpuChip,
  HiChatBubbleBottomCenterText,
  HiArrowDownTray as HiDownload,
  HiFlag,
  HiAcademicCap,
  HiScale,
  HiDocumentText,
  HiHandThumbUp,
  HiHandThumbDown,
  HiXMark,
  HiMinus,
  HiPlus,
  HiAdjustmentsHorizontal,
  HiRocketLaunch,
  HiCube,  
  HiPhoto,
  HiDocumentChartBar, 
  HiListBullet,
  HiSquares2X2,
} from "react-icons/hi2";

const COLORS = ["#10b981", "#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6"]; // green, red, amber, blue, purple
const GRADE_COLORS = {
  "A+": "#10b981",
  "A": "#22c55e", 
  "B+": "#84cc16",
  "B": "#eab308",
  "C+": "#f59e0b",
  "C": "#f97316",
  "D": "#ef4444",
  "F": "#dc2626"
};

const TRUST_LEVELS = {
  "A+": { text: "Highly Trustworthy", color: "#10b981", bg: "bg-green-500/20", border: "border-green-500/30" },
  "A": { text: "Very Trustworthy", color: "#22c55e", bg: "bg-green-500/20", border: "border-green-500/30" },
  "B+": { text: "Trustworthy", color: "#84cc16", bg: "bg-lime-500/20", border: "border-lime-500/30" },
  "B": { text: "Moderately Trustworthy", color: "#eab308", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  "C+": { text: "Questionable", color: "#f59e0b", bg: "bg-amber-500/20", border: "border-amber-500/30" },
  "C": { text: "Unreliable", color: "#f97316", bg: "bg-orange-500/20", border: "border-orange-500/30" },
  "D": { text: "Highly Unreliable", color: "#ef4444", bg: "bg-red-500/20", border: "border-red-500/30" },
  "F": { text: "Completely Unreliable", color: "#dc2626", bg: "bg-red-600/20", border: "border-red-600/30" }
};

const Analyzer = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [stats, setStats] = useState(null);
  const [url, setUrl] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('all'); // 'all', 'real', 'fake'
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'date', 'authenticity'
  const [animateResults, setAnimateResults] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const [reviewsPerPage, setReviewsPerPage] = useState(10);

  useEffect(() => {
    const storedUrl = localStorage.getItem("productURL");
    if (storedUrl) {
      setUrl(storedUrl);
      // Don't automatically fetch - let user click "Analyze Reviews" button
    }
  }, []);

  const fetchReviews = async (productUrl) => {
    setLoading(true);
    setError("");
    setShowResults(false);
    setAnimateResults(false);

    try {
      const res = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Backend response:", data); // Debug log
        console.log("Product name from backend:", data.product_name); // Debug log
        
        setProductName(data.product_name || "Unknown Product");
        setReviews(data.reviews);
        setImages(data.images);
        setRecommendation(data.overall_rating);
        setStats(data.stats);
        setShowResults(true);
        setCurrentPage(1);
        setFilterType('all');
        setSortBy('rating');
        // Store the URL in localStorage for future use
        localStorage.setItem("productURL", productUrl);
        
        // Animate results after a short delay
        setTimeout(() => setAnimateResults(true), 300);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch data from server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid product URL");
      return;
    }
    fetchReviews(url.trim());
  };

  const clearAnalysis = () => {
    setUrl("");
    setReviews([]);
    setProductName("");
    setImages([]);
    setRecommendation("");
    setStats(null);
    setShowResults(false);
    setError("");
    setCurrentPage(1);
    setFilterType('all');
    setSortBy('rating');
    setAnimateResults(false);
    setExpandedCard(null);
    setShowAdvancedStats(false);
    localStorage.removeItem("productURL");
  };

  const exportToExcel = async () => {
    try {
      // Create workbook and worksheets
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Review Shield';
      workbook.created = new Date();
      
      // Summary Sheet
      const summarySheet = workbook.addWorksheet('Summary', {
        headerFooter: { firstHeader: 'Review Shield Analysis Summary' }
      });
      
      // Add summary data
      summarySheet.addRow(['Product Analysis Summary', '']);
      summarySheet.addRow(['Product Name', productName && productName !== "Unknown Product" ? productName : 'Product Analysis']);
      summarySheet.addRow(['Analysis Date', new Date().toLocaleDateString()]);
      summarySheet.addRow(['Total Reviews', reviews.length]);
      summarySheet.addRow(['Authentic Reviews', stats?.real || 0]);
      summarySheet.addRow(['Suspicious Reviews', stats?.fake || 0]);
      summarySheet.addRow(['Authenticity Score', `${stats?.real_percent?.toFixed(1) || 0}%`]);
      summarySheet.addRow(['Grade', stats?.grade || 'N/A']);
      summarySheet.addRow(['Risk Level', advancedStats?.riskLevel || 'N/A']);
      summarySheet.addRow(['Average Rating', advancedStats?.averageRating || 'N/A']);
      summarySheet.addRow(['Recommendation', recommendation || 'N/A']);
      summarySheet.addRow(['']);
      summarySheet.addRow(['Advanced Statistics', '']);
      summarySheet.addRow(['Trust Score', `${advancedStats?.trustScore || 0}%`]);
      summarySheet.addRow(['Review Quality', advancedStats?.reviewQuality || 'N/A']);
      summarySheet.addRow(['Confidence Level', `${advancedStats?.confidence || 0}%`]);
      summarySheet.addRow(['Total Words', advancedStats?.totalWords || 0]);
      summarySheet.addRow(['Average Words per Review', advancedStats?.averageWordsPerReview || 0]);
      
      // Style the summary sheet
      summarySheet.getColumn(1).width = 25;
      summarySheet.getColumn(2).width = 20;
      summarySheet.getRow(1).font = { bold: true, size: 14 };
      summarySheet.getRow(13).font = { bold: true, size: 12 };
      
      // Reviews Sheet
      const reviewsSheet = workbook.addWorksheet('Reviews');
      
      // Add headers
      const reviewHeaders = ['Review ID', 'Title', 'Rating', 'Reviewer', 'Comment', 'Authenticity', 'Prediction Score', 'Word Count'];
      reviewsSheet.addRow(reviewHeaders);
      
      // Style headers
      const headerRow = reviewsSheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' }
      };
      headerRow.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      
      // Add review data
      reviews.forEach((review, index) => {
        const row = reviewsSheet.addRow([
          index + 1,
          review.CommentHead || 'No Title',
          review.Rating || 'N/A',
          review.Name || 'Anonymous',
          review.Comment || 'No Comment',
          review.Prediction === 1 ? 'Authentic' : 'Suspicious',
          review.Prediction !== undefined ? review.Prediction : 'N/A',
          review.Comment ? review.Comment.split(' ').length : 0
        ]);
        
        // Color code authenticity column
        if (review.Prediction === 1) {
          row.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF10B981' }
          };
          row.getCell(6).font = { color: { argb: 'FFFFFFFF' } };
        } else {
          row.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFEF4444' }
          };
          row.getCell(6).font = { color: { argb: 'FFFFFFFF' } };
        }
      });
      
      // Auto-fit columns
      reviewsSheet.columns.forEach(column => {
        column.width = 15;
      });
      reviewsSheet.getColumn(4).width = 30; // Comment column
      reviewsSheet.getColumn(5).width = 50; // Comment column
      
      // Statistics Sheet
      const statsSheet = workbook.addWorksheet('Statistics');
      
      // Add statistics headers
      const statsHeaders = ['Metric', 'Value'];
      statsSheet.addRow(statsHeaders);
      
      // Style stats headers
      const statsHeaderRow = statsSheet.getRow(1);
      statsHeaderRow.font = { bold: true };
      statsHeaderRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF8B5CF6' }
      };
      statsHeaderRow.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      
      // Add statistics data
      const statsData = [
        ['Total Reviews', reviews.length],
        ['Authentic Reviews', stats?.real || 0],
        ['Suspicious Reviews', stats?.fake || 0],
        ['Authenticity Percentage', `${stats?.real_percent?.toFixed(1) || 0}%`],
        ['Suspicious Percentage', `${stats?.fake_percent?.toFixed(1) || 0}%`],
        ['Average Rating', advancedStats?.averageRating || 'N/A'],
        ['Trust Score', `${advancedStats?.trustScore || 0}%`],
        ['Risk Level', advancedStats?.riskLevel || 'N/A'],
        ['Review Quality', advancedStats?.reviewQuality || 'N/A'],
        ['Confidence Level', `${advancedStats?.confidence || 0}%`],
        ['Total Words', advancedStats?.totalWords || 0],
        ['Average Words per Review', advancedStats?.averageWordsPerReview || 0],
      ];
      
      statsData.forEach(([metric, value]) => {
        statsSheet.addRow([metric, value]);
      });
      
      // Auto-fit columns
      statsSheet.getColumn(1).width = 25;
      statsSheet.getColumn(2).width = 20;
      
      // Generate filename
      const safeProductName = productName && productName !== "Unknown Product" 
        ? productName.replace(/[^a-zA-Z0-9]/g, '_') 
        : 'Product_Analysis';
      const fileName = `Review_Shield_Analysis_${safeProductName}_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Write file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting to Excel. Please try again.');
    }
  };

  // Filter and sort reviews
  const filteredReviews = reviews.filter(review => {
    if (filterType === 'all') return true;
    if (filterType === 'real') return review.Prediction === 1;
    if (filterType === 'fake') return review.Prediction === 0;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'rating') return b.Rating - a.Rating;
    if (sortBy === 'authenticity') return b.Prediction - a.Prediction;
    return 0;
  });

  // Pagination - ensure currentPage doesn't exceed available pages
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validCurrentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = sortedReviews.slice(startIndex, endIndex);

  // Update currentPage if it's out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const chartData = stats
    ? [
        { name: "Authentic Reviews", value: stats.real, color: "#10b981" },
        { name: "Suspicious Reviews", value: stats.fake, color: "#ef4444" },
      ]
    : [];

  // Advanced statistics
  const advancedStats = stats ? {
    trustScore: Math.round(stats.real_percent),
    riskLevel: stats.real_percent >= 80 ? 'Low' : stats.real_percent >= 60 ? 'Medium' : 'High',
    reviewQuality: stats.real_percent >= 90 ? 'Excellent' : stats.real_percent >= 70 ? 'Good' : stats.real_percent >= 50 ? 'Fair' : 'Poor',
    confidence: Math.round(85 + (stats.real_percent * 0.15)), // Mock confidence calculation
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.Rating, 0) / reviews.length).toFixed(1) : 0,
    totalWords: reviews.reduce((sum, r) => sum + (r.Comment ? r.Comment.split(' ').length : 0), 0),
    averageWordsPerReview: reviews.length > 0 ? Math.round(reviews.reduce((sum, r) => sum + (r.Comment ? r.Comment.split(' ').length : 0), 0) / reviews.length) : 0
  } : null;

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-500 rounded-full p-3 animate-pulse">
              <HiCpuChip className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">AI Analysis in Progress</h3>
        <p className="text-gray-300 mb-6 text-lg">Our advanced AI is examining reviews for authenticity patterns...</p>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-400 font-medium">Processing stages:</span>
            <span className="text-blue-400 text-sm">85%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <HiCheckCircle className="text-green-400" />
              <span>Extracting reviews...</span>
            </div>
            <div className="flex items-center gap-2">
              <HiCheckCircle className="text-green-400" />
              <span>Analyzing language patterns...</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 border border-blue-500 border-t-transparent"></div>
              <span>Calculating authenticity scores...</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto bg-gray-800/50 backdrop-blur-sm rounded-3xl p-10 border border-red-500/30 shadow-2xl">
        <div className="relative mb-6">
          <div className="bg-red-500/20 rounded-full p-6 inline-block">
            <HiExclamationTriangle className="text-red-500 text-5xl" />
          </div>
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-2 animate-bounce">
            <HiXMark className="text-white text-sm" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-red-400 mb-4">Analysis Failed</h3>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-300 text-lg">{error}</p>
        </div>
        <div className="text-gray-400 text-sm mb-8">
          <p>Common issues:</p>
          <ul className="text-left mt-2 space-y-1">
            <li>• Invalid or inaccessible product URL</li>
            <li>• Network connectivity issues</li>
            <li>• Server temporarily unavailable</li>
            <li>• Product page structure changed</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <HiRefresh className="w-5 h-5" />
            Try Again
          </button>
          <button 
            onClick={clearAnalysis}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl transition-all flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <HiTrash className="w-5 h-5" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <HiShieldCheck className="text-blue-400 text-4xl" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Review Shield
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered review authenticity analysis
          </p>
        </div>

        {/* URL Input Form */}
        {!showResults && !loading && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-12 shadow-2xl">
              <div className="text-center mb-10">
                <div className="relative mb-8">
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 inline-block">
                    <HiMagnifyingGlass className="text-white text-5xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 animate-pulse">
                    <HiSparkles className="text-white text-sm" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  AI-Powered Review Analysis
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                  Enter a product URL from popular e-commerce platforms to analyze review authenticity using advanced machine learning algorithms
                </p>
              </div>
              
              {/* Supported Platforms */}
              <div className="mb-8">
                <p className="text-gray-400 text-center mb-4">Supported Platforms:</p>
                <div className="flex justify-center gap-6">
                  <div className="bg-gray-700/50 rounded-xl p-3 flex items-center gap-2">
                    <HiGlobeAlt className="text-blue-400 text-xl" />
                    <span className="text-white font-medium">Flipkart</span>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-3 flex items-center gap-2">
                    <HiGlobeAlt className="text-orange-400 text-xl" />
                    <span className="text-white font-medium">Amazon</span>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-3 flex items-center gap-2">
                    <HiGlobeAlt className="text-green-400 text-xl" />
                    <span className="text-white font-medium">More coming soon</span>
                  </div>
                </div>
              </div>
              
              {url && (
                <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/20 rounded-full p-3">
                        <HiLink className="text-blue-400 text-2xl" />
                      </div>
                      <div>
                        <p className="text-blue-400 font-semibold text-lg">Previously Analyzed URL</p>
                        <p className="text-gray-300 text-sm">
                          {url.length > 70 ? url.substring(0, 70) + '...' : url}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearAnalysis}
                      className="text-blue-400 hover:text-blue-300 transition-colors p-3 rounded-xl hover:bg-blue-500/10 group"
                    >
                      <HiTrash className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="url" className="block text-xl font-semibold text-gray-300 mb-4">
                    Product URL
                  </label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-blue-500/20 rounded-lg p-2">
                      <HiLink className="text-blue-400 text-xl" />
                    </div>
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.flipkart.com/product/... or https://www.amazon.com/product/..."
                      className="w-full pl-16 pr-6 py-5 bg-gray-700/50 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg hover:bg-gray-700/70 focus:bg-gray-700/70"
                      required
                    />
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                      <HiMagnifyingGlass className="text-gray-400 text-xl" />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-5 px-10 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <HiRocketLaunch className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    {loading ? "Analyzing..." : "Analyze Reviews"}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
                  </button>
                  {url && (
                    <button
                      type="button"
                      onClick={clearAnalysis}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-5 px-8 rounded-2xl transition-all flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <HiTrash className="w-5 h-5" />
                      Clear
                    </button>
                  )}
                </div>
              </form>
              
              {error && (
                <div className="mt-8 p-6 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center gap-4">
                  <HiExclamationTriangle className="text-red-400 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium">Error</p>
                    <p className="text-red-300">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className={`transition-all duration-1000 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-4">
                    <HiCheckCircle className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 animate-pulse">
                    <HiSparkles className="text-white text-sm" />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">Analysis Complete</h2>
                  <p className="text-gray-400 text-lg">
                    {productName && productName !== "Unknown Product" ? productName : "Product Analysis"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {reviews.length} reviews analyzed • {Math.round(stats?.real_percent || 0)}% authentic
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <HiAdjustmentsHorizontal className="w-5 h-5" />
                  {showAdvancedStats ? 'Hide' : 'Show'} Details
                </button>
                <button
                  onClick={clearAnalysis}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <HiRefresh className="w-5 h-5" />
                  New Analysis
                </button>
              </div>
            </div>

            {/* Trust Score Hero Section */}
            {stats && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="flex justify-center items-center gap-4 mb-4">
                      <div 
                        className="text-6xl font-bold rounded-full w-24 h-24 flex items-center justify-center text-white shadow-lg"
                        style={{ backgroundColor: GRADE_COLORS[stats.grade] }}
                      >
                        {stats.grade}
                      </div>
                      <div className="text-left">
                        <h3 className="text-4xl font-bold text-white">{stats.real_percent.toFixed(1)}%</h3>
                        <p className="text-xl text-gray-300">Authenticity Score</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {TRUST_LEVELS[stats.grade]?.text || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{stats.real}</div>
                        <div className="text-gray-400 text-sm">Authentic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{stats.fake}</div>
                        <div className="text-gray-400 text-sm">Suspicious</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
                        <div className="text-gray-400 text-sm">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{advancedStats?.confidence || 0}%</div>
                        <div className="text-gray-400 text-sm">Confidence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Stats Section */}
            {showAdvancedStats && advancedStats && (
              <div className="mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <HiDocumentChartBar className="text-blue-400" />
                    Advanced Analytics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-500/20 rounded-xl p-4 mb-3">
                        <HiScale className="text-blue-400 text-2xl mx-auto" />
                      </div>
                      <div className="text-lg font-bold text-white">{advancedStats.trustScore}%</div>
                      <div className="text-gray-400 text-sm">Trust Score</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-500/20 rounded-xl p-4 mb-3">
                        <HiStar className="text-green-400 text-2xl mx-auto" />
                      </div>
                      <div className="text-lg font-bold text-white">{advancedStats.averageRating}</div>
                      <div className="text-gray-400 text-sm">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-500/20 rounded-xl p-4 mb-3">
                        <HiChatBubbleBottomCenterText className="text-purple-400 text-2xl mx-auto" />
                      </div>
                      <div className="text-lg font-bold text-white">{advancedStats.totalWords}</div>
                      <div className="text-gray-400 text-sm">Total Words</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-500/20 rounded-xl p-4 mb-3">
                        <HiDocumentText className="text-orange-400 text-2xl mx-auto" />
                      </div>
                      <div className="text-lg font-bold text-white">{advancedStats.averageWordsPerReview}</div>
                      <div className="text-gray-400 text-sm">Words/Review</div>
                    </div>
                    <div className="text-center">
                      <div className={`rounded-xl p-4 mb-3 ${
                        advancedStats.riskLevel === 'Low' ? 'bg-green-500/20' :
                        advancedStats.riskLevel === 'Medium' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                      }`}>
                        <HiShieldCheck className={`text-2xl mx-auto ${
                          advancedStats.riskLevel === 'Low' ? 'text-green-400' :
                          advancedStats.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                      </div>
                      <div className="text-lg font-bold text-white">{advancedStats.riskLevel}</div>
                      <div className="text-gray-400 text-sm">Risk Level</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-500/20 rounded-xl p-4 mb-3">
                        <HiAcademicCap className="text-indigo-400 text-2xl mx-auto" />
                      </div>
                      <div className="text-lg font-bold text-white">{advancedStats.reviewQuality}</div>
                      <div className="text-gray-400 text-sm">Quality</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-4 gap-8 mb-8">
              {/* Product Info */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <HiCube className="text-blue-400" />
                    Product Details
                  </h3>
                  
                  {/* Product Image */}
                  <div className="mb-6">
                    <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                      {images && images.length > 0 ? (
                        <img
                          src={images[0]}
                          alt="Product"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full ${images && images.length > 0 ? 'hidden' : 'flex'} items-center justify-center bg-gray-200`}>
                        <div className="text-center">
                          <HiPhoto className="text-gray-500 text-6xl mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">No image available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Name */}
                  <h4 className="text-xl font-semibold text-white mb-6">
                    {productName && productName !== "Unknown Product" ? productName : "Product Analysis"}
                  </h4>
                  
                  {/* Recommendation */}
                  {recommendation && (
                    <div className={`p-6 rounded-2xl border-2 ${
                      recommendation.includes('Recommended') 
                        ? 'bg-green-500/20 border-green-500/30' 
                        : 'bg-red-500/20 border-red-500/30'
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        {recommendation.includes('Recommended') 
                          ? <HiCheckCircle className="text-green-400 text-2xl" />
                          : <HiXCircle className="text-red-400 text-2xl" />
                        }
                        <span className={`font-semibold text-lg ${
                          recommendation.includes('Recommended') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          Our Recommendation
                        </span>
                      </div>
                      <p className={`${
                        recommendation.includes('Recommended') ? 'text-green-300' : 'text-red-300'
                      }`}>
                        {recommendation}
                      </p>
                    </div>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="mt-6 space-y-3">
                    <button 
                      onClick={exportToExcel}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center gap-2 justify-center"
                    >
                      <HiDownload className="w-5 h-5" />
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="lg:col-span-3">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <HiChartBar className="text-blue-400" />
                    Visual Analysis
                  </h3>
                  
                  {stats && (
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Pie Chart */}
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-6 text-center">Review Distribution</h4>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: '#1f2937',
                                  border: '1px solid #374151',
                                  borderRadius: '12px',
                                  color: '#fff',
                                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                }}
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      {/* Bar Chart */}
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-6 text-center">Authenticity Breakdown</h4>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { name: 'Authentic', value: stats.real_percent, color: '#10b981' },
                              { name: 'Suspicious', value: stats.fake_percent, color: '#ef4444' }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="name" stroke="#9ca3af" />
                              <YAxis stroke="#9ca3af" />
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: '#1f2937',
                                  border: '1px solid #374151',
                                  borderRadius: '12px',
                                  color: '#fff',
                                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                }}
                                formatter={(value) => [`${value.toFixed(1)}%`, 'Percentage']}
                              />
                              <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews List Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <HiListBullet className="text-blue-400" />
                  Individual Reviews
                  <span className="text-xl text-gray-400 font-normal">
                    ({currentReviews.length} of {sortedReviews.length} {filterType !== 'all' ? `${filterType}` : 'total'})
                  </span>
                </h2>
                
                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                  {/* Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-gray-700 text-white px-4 py-2 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Reviews</option>
                    <option value="real">Authentic Only</option>
                    <option value="fake">Suspicious Only</option>
                  </select>
                  
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="authenticity">Sort by Authenticity</option>
                  </select>
                  
                  {/* View Mode */}
                  <div className="flex bg-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                        viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <HiSquares2X2 className="w-4 h-4" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                        viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <HiListBullet className="w-4 h-4" />
                      List
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Reviews Grid/List */}
              {currentReviews && currentReviews.length > 0 ? (
                <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'} mb-8`}>
                  {currentReviews.map((r, index) => (
                    <div
                      key={`${startIndex + index}-${r.Comment?.substring(0, 50) || 'no-comment'}`}
                      className={`bg-gray-700/50 rounded-2xl p-6 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg ${
                        expandedCard === (startIndex + index) ? 'ring-2 ring-blue-500/50' : ''
                      }`}
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white line-clamp-1">
                                {r.CommentHead || "Review"}
                              </h3>
                              {r.Prediction !== undefined && (
                                <div className="flex items-center gap-2">
                                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                    r.Prediction === 1 
                                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  }`}>
                                    {r.Prediction === 1 ? (
                                      <HiCheckCircle className="w-3 h-3" />
                                    ) : (
                                      <HiXCircle className="w-3 h-3" />
                                    )}
                                    {r.Prediction === 1 ? 'Authentic' : 'Suspicious'}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <HiStar 
                                      key={i} 
                                      className={`w-4 h-4 ${
                                        i < r.Rating ? 'text-yellow-400' : 'text-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-yellow-400 font-medium ml-1">{r.Rating}</span>
                              </div>
                              <span className="text-gray-400">by {r.Name || "Anonymous"}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const globalIndex = startIndex + index;
                              setExpandedCard(expandedCard === globalIndex ? null : globalIndex);
                            }}
                            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-600/50"
                          >
                            {expandedCard === (startIndex + index) ? (
                              <HiMinus className="w-5 h-5" />
                            ) : (
                              <HiPlus className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        
                        {/* Content */}
                        <div className={`${expandedCard === (startIndex + index) ? '' : 'line-clamp-3'}`}>
                          <p className="text-gray-200 leading-relaxed">
                            {r.Comment || "No comment provided"}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        {expandedCard === (startIndex + index) && (
                          <div className="flex gap-2 pt-4 border-t border-gray-600/50">
                            <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
                              <HiHandThumbUp className="w-4 h-4" />
                              Helpful
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm">
                              <HiHandThumbDown className="w-4 h-4" />
                              Not Helpful
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                              <HiFlag className="w-4 h-4" />
                              Report
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">📝</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Reviews Found</h3>
                  <p className="text-gray-400 text-lg mb-2">
                    {filterType === 'all' 
                      ? "No reviews found for analysis" 
                      : `No ${filterType} reviews found`
                    }
                  </p>
                  <p className="text-gray-500 text-sm">
                    {filterType === 'all' 
                      ? "Try analyzing a different product URL" 
                      : "Try adjusting your filter settings"
                    }
                  </p>
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="space-y-4">
                  {/* Pagination Info */}
                  <div className="text-center text-gray-400 text-sm">
                    Showing {startIndex + 1} to {Math.min(endIndex, sortedReviews.length)} of {sortedReviews.length} reviews
                    {filterType !== 'all' && ` (${filterType})`}
                  </div>
                  
                  {/* Pagination Controls */}
                  <div className="flex items-center justify-center gap-2">
                    {/* First Page */}
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={validCurrentPage === 1}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <HiArrowLeft className="w-4 h-4" />
                      <HiArrowLeft className="w-4 h-4" />
                    </button>
                    
                    {/* Previous Page */}
                    <button
                      onClick={() => setCurrentPage(Math.max(1, validCurrentPage - 1))}
                      disabled={validCurrentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <HiArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {(() => {
                        const pages = [];
                        const maxVisiblePages = 5;
                        let startPage = Math.max(1, validCurrentPage - Math.floor(maxVisiblePages / 2));
                        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                        
                        // Adjust start page if we're near the end
                        if (endPage - startPage + 1 < maxVisiblePages) {
                          startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }
                        
                        // Add first page and ellipsis if needed
                        if (startPage > 1) {
                          pages.push(
                            <button
                              key={1}
                              onClick={() => setCurrentPage(1)}
                              className="w-10 h-10 rounded-lg font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600"
                            >
                              1
                            </button>
                          );
                          if (startPage > 2) {
                            pages.push(
                              <span key="start-ellipsis" className="w-10 h-10 flex items-center justify-center text-gray-500">
                                ...
                              </span>
                            );
                          }
                        }
                        
                        // Add visible page numbers
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i)}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                validCurrentPage === i
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }
                        
                        // Add last page and ellipsis if needed
                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <span key="end-ellipsis" className="w-10 h-10 flex items-center justify-center text-gray-500">
                                ...
                              </span>
                            );
                          }
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => setCurrentPage(totalPages)}
                              className="w-10 h-10 rounded-lg font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600"
                            >
                              {totalPages}
                            </button>
                          );
                        }
                        
                        return pages;
                      })()}
                    </div>
                    
                    {/* Next Page */}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, validCurrentPage + 1))}
                      disabled={validCurrentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <HiArrowRight className="w-4 h-4" />
                    </button>
                    
                    {/* Last Page */}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={validCurrentPage === totalPages}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <HiArrowRight className="w-4 h-4" />
                      <HiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Items per page selector */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <span>Items per page:</span>
                    <select
                      value={reviewsPerPage}
                      onChange={(e) => {
                        const newPerPage = parseInt(e.target.value);
                        setReviewsPerPage(newPerPage);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
