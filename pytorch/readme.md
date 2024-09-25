# WeatherPredictor

A machine learning project for predicting weather patterns using PyTorch.

## Getting Started

### Prerequisites

- Python 3.7+
- NVIDIA GPU (optional, for CUDA support)

### Installation

Choose one of the following installation methods:

#### Option 1: Using Conda (recommended)

1. Install Anaconda or Miniconda
2. Clone the repository:
   ```
   git clone https://github.com/Horbee/pytorch-rain-predictor.git
   cd pytorch-rain-predictor
   ```
3. Create and activate the Conda environment:
   ```
   conda env create -f environment.yml
   conda activate rainpredictor
   ```

#### Option 2: Using pip

1. Ensure you have Python 3.7+ installed
2. Clone the repository:
   ```
   git clone https://github.com/Horbee/pytorch-rain-predictor.git
   cd pytorch-rain-predictor
   ```
3. Create and activate a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### CUDA Support (for NVIDIA GPUs)

If you have an NVIDIA GPU and want to use CUDA:

1. Ensure you have the appropriate NVIDIA drivers installed
2. Install the CUDA-enabled version of PyTorch:

   For Conda:

   ```
   conda install pytorch pytorch-cuda=12.4 -c pytorch -c nvidia
   ```

   For pip:

   ```
   pip install torch --index-url https://download.pytorch.org/whl/cu124
   ```

   Note: Replace `12.4` with your desired CUDA version if different.

3. Verify CUDA is available:
   ```python
   import torch
   print(torch.cuda.is_available())
   ```
   This should return `True` if CUDA is properly set up.

### Usage

Open and run the `WeatherPredictor.ipynb` Jupyter notebook to:

1. Load and preprocess weather data
2. Train the weather prediction model
3. Evaluate model performance
4. Make predictions

## Project Structure

- `WeatherPredictor.ipynb`: Main Jupyter notebook containing the project code
- `README.md`: This file

## License

[MIT License](https://opensource.org/licenses/MIT)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
