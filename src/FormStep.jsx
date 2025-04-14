import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormStep({
  currentStep,
  totalSteps,
  stepConfig,
  formData,
  onNext,
  onBack,
  progressValue,
  tabLabels,
  activeTabIndex,
}) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  // When the step changes, initialize the input value from formData
  useEffect(() => {
    if (stepConfig.type === 'file') {
      const defaultObj = formData[stepConfig.key] || {
        leftEyeFile: null,
        rightEyeFile: null,
      };
      setInputValue(defaultObj);
    } else {
      setInputValue(formData[stepConfig.key] || '');
    }
    setError('');
  }, [stepConfig, formData]);

  // Validation function for each field
  const validateInput = () => {
    if (stepConfig.type !== 'file' && !inputValue) {
      return 'This field is required';
    }
    switch (stepConfig.key) {
      case 'name':
        if (inputValue.length < 2) return 'Name must be at least 2 characters';
        if (inputValue.length > 25) return 'Name cannot exceed 25 characters';
        break;
      case 'age':
        if (isNaN(inputValue)) return 'Please enter a valid number';
        if (Number(inputValue) < 1 || Number(inputValue) > 99)
          return 'Age must be between 1 and 99';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(inputValue))
          return 'Please enter a 10-digit phone number';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue))
          return 'Invalid email format';
        break;
      case 'gender':
        if (!inputValue) return 'Please select a gender';
        break;
      case 'bloodGroup':
        if (!inputValue) return 'Please select a blood group';
        break;
      case 'eyePhotos':
        if (!inputValue.leftEyeFile || !inputValue.rightEyeFile)
          return 'Please upload both left eye and right eye photos';
        break;
      default:
        if (!inputValue) return 'This field is required';
        break;
    }
    return '';
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onNext(inputValue);
  };

  // Handle changes for text, phone, email, and number fields
  const handleChange = (e) => {
    let val = e.target.value;
    if (stepConfig.key === 'name') {
      val = val.slice(0, 25);
    } else if (stepConfig.key === 'age') {
      val = val.slice(0, 2);
    }
    setInputValue(val);
    setError('');
  };

  // For gender selection
  const handleGenderSelect = (gender) => {
    setInputValue(gender);
    setError('');
  };

  // For blood group selection
  const handleBloodGroupSelect = (bg) => {
    setInputValue(bg);
    setError('');
  };

  // File input handlers for left and right eye photos
  const handleLeftEyeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setInputValue((prev) => ({ ...prev, leftEyeFile: file }));
    setError('');
  };

  const handleRightEyeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setInputValue((prev) => ({ ...prev, rightEyeFile: file }));
    setError('');
  };

  // Renders the input field based on step type
  const renderInput = () => {
    switch (stepConfig.type) {
      case 'text':
      case 'phone':
      case 'email':
      case 'number':
        return (
          <input
            style={styles.input}
            type={stepConfig.type === 'phone' ? 'tel' : stepConfig.type}
            placeholder={stepConfig.placeholder}
            value={inputValue}
            onChange={handleChange}
          />
        );
      case 'gender':
        return (
          <div style={styles.genderContainer}>
            <button
              type="button"
              style={{
                ...styles.genderButton,
                backgroundColor: inputValue === 'Male' ? '#8BC34A' : '#f0f0f0',
              }}
              onClick={() => handleGenderSelect('Male')}
            >
              Male
            </button>
            <button
              type="button"
              style={{
                ...styles.genderButton,
                backgroundColor: inputValue === 'Female' ? '#8BC34A' : '#f0f0f0',
              }}
              onClick={() => handleGenderSelect('Female')}
            >
              Female
            </button>
          </div>
        );
      case 'bloodGroup':
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        return (
          <div style={styles.bloodGroupContainer}>
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                type="button"
                style={{
                  ...styles.bloodGroupButton,
                  backgroundColor: inputValue === bg ? '#8BC34A' : '#f0f0f0',
                }}
                onClick={() => handleBloodGroupSelect(bg)}
              >
                {bg}
              </button>
            ))}
          </div>
        );
      case 'file':
        return (
          <div style={styles.fileUploadContainer}>
            <div style={styles.uploadButtons}>
              <button
                type="button"
                style={styles.uploadButton}
                onClick={() => leftEyeRef.current.click()}
              >
                Upload Left Eye Photo
              </button>
              <button
                type="button"
                style={styles.uploadButton}
                onClick={() => rightEyeRef.current.click()}
              >
                Upload Right Eye Photo
              </button>
            </div>
            <input
              ref={leftEyeRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleLeftEyeChange}
            />
            <input
              ref={rightEyeRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleRightEyeChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  // When "Exit" is clicked, navigate back to the landing page
  const handleExit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        {onBack && (
          <button style={styles.prevButton} onClick={onBack}>
            ← Previous
          </button>
        )}
        <div style={styles.tabsContainer}>
          {tabLabels.map((label, idx) => {
            const isActive = idx === activeTabIndex;
            return (
              <div
                key={idx}
                style={{
                  ...styles.tabItem,
                  backgroundColor: isActive ? '#DCE6F7' : '#ECECEC',
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
        <a href="#!" onClick={handleExit} style={styles.exitLink}>
          Exit
        </a>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div
            style={{ ...styles.progressFill, width: `${progressValue}%` }}
          />
        </div>
        <span style={styles.percentage}>{progressValue}%</span>
      </div>

      {/* Form Content */}
      <form style={styles.formContent} onSubmit={handleSubmit}>
        <h3 style={styles.question}>{stepConfig.title}</h3>
        <div style={styles.inputContainer}>{renderInput()}</div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.nextButton}>
          {currentStep === totalSteps ? 'Submit' : 'NEXT →'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '24px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
  },
  prevButton: {
    border: 'none',
    background: 'none',
    color: '#4A90E2',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '16px',
  },
  tabsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    gap: '8px',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
    padding: '8px 4px',
    fontSize: '14px',
    borderRadius: '4px',
    fontWeight: 500,
  },
  exitLink: {
    marginLeft: '16px',
    color: '#666',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  progressContainer: {
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  progressBar: {
    flex: 1,
    height: '4px',
    backgroundColor: '#EEEEEE',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    transition: 'width 0.3s ease',
  },
  percentage: {
    fontSize: '14px',
    color: '#666666',
    fontWeight: 500,
  },
  formContent: {
    textAlign: 'center',
    maxWidth: '400px',
    margin: '0 auto',
  },
  question: {
    fontSize: '20px',
    color: '#333333',
    margin: '0 0 24px 0',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #DDDDDD',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  error: {
    color: '#ff4444',
    fontSize: '14px',
    marginBottom: '16px',
  },
  nextButton: {
    padding: '14px 32px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  genderContainer: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  genderButton: {
    flex: 1,
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  bloodGroupContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  bloodGroupButton: {
    flex: '0 0 calc(25% - 8px)',
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
  },
  fileUploadContainer: {
    textAlign: 'center',
  },
  uploadButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  uploadButton: {
    padding: '12px 16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
