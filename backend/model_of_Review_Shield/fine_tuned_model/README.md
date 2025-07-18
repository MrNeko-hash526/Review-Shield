# Model Placeholder

This directory should contain your fine-tuned DistilBERT model files.

## Expected files:

- `config.json` - Model configuration
- `pytorch_model.bin` - Model weights
- `tokenizer.json` - Tokenizer configuration
- `tokenizer_config.json` - Tokenizer settings
- `vocab.txt` - Vocabulary file
- `special_tokens_map.json` - Special tokens mapping

## How to add your model:

1. Copy your fine-tuned model files to this directory
2. Make sure all the above files are present
3. Restart the Flask server

## If you don't have a model:

The application will work with mock predictions for testing purposes.
You can still use all the web scraping functionality.

## Training a new model:

If you need to train a new model, you can use the Hugging Face Transformers library:

```python
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast
from transformers import Trainer, TrainingArguments

# Your training code here
```

The model should be a binary classification model that predicts:

- 0 = Fake review
- 1 = Real review
