import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <-- New import
import FormStep from './FormStep';
import { Link } from 'react-router-dom';


/**
 * STEP ORDER:
 * 1) Name
 * 2) Age
 * 3) Gender
 * 4) Blood Group
 * 5) Phone Number
 * 6) Email
 * 7) Upload Eye Photos
 */
export default function MultiStepForm() {
  const steps = [
    {
      title: 'Before we start, can we get your name?',
      type: 'text',
      key: 'name',
      placeholder: 'Your Name',
      stepLabel: 'About You',
    },
    {
      title: 'Please enter your age',
      type: 'number',
      key: 'age',
      placeholder: 'Your Age',
      stepLabel: 'About You',
    },
    {
      title: 'Select your gender',
      type: 'gender',
      key: 'gender',
      stepLabel: 'About You',
    },
    {
      title: 'Select your blood group',
      type: 'bloodGroup',
      key: 'bloodGroup',
      stepLabel: 'About You',
    },
    {
      title: 'Phone Number',
      type: 'phone',
      key: 'phone',
      placeholder: 'Phone Number',
      stepLabel: 'About You',
    },
    {
      title: 'Email',
      type: 'email',
      key: 'email',
      placeholder: 'Your Email',
      stepLabel: 'About You',
    },
    {
      title: 'Upload images of your eyes for analysis',
      type: 'file',
      key: 'eyePhotos',
      stepLabel: 'Upload Image',
    },
  ];

  const tabLabels = ['About You', 'Upload Image'];

  // 7 steps => 7 progress values (adjust as you like)
  const progressValues = [0, 10, 20, 40, 60, 80, 95];

  const getActiveTabIndex = (label) => tabLabels.indexOf(label);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    email: '',
    eyePhotos: { leftEyeFile: null, rightEyeFile: null },
  });

  useEffect(() => {
    if (currentStep > steps.length) {
      const sendForm = async () => {
        const form = new FormData();
  
        for (let key in formData) {
          if (key === 'eyePhotos') {
            if (formData.eyePhotos.leftEyeFile) {
              form.append('leftEyeFile', formData.eyePhotos.leftEyeFile);
            }
            if (formData.eyePhotos.rightEyeFile) {
              form.append('rightEyeFile', formData.eyePhotos.rightEyeFile);
            }
          } else {
            form.append(key, formData[key]);
          }
        }
  
        try {
          const response = await axios.post('/.netlify/functions/sendForm', form);
          console.log('Form sent successfully:', response.data);
        } catch (err) {
          console.error('Failed to send form:', err);
        }
      };
  
      sendForm();
    }
  }, [currentStep]);
  

  const handleNext = (value) => {
    const stepKey = steps[currentStep - 1].key;
    setFormData((prev) => ({ ...prev, [stepKey]: value }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (currentStep > steps.length) {
    return (
      <div style={completionStyles.container}>
        <h2>Registration Complete!</h2>
        <p>Below is the data you submitted:</p>
        <pre style={completionStyles.pre}>{JSON.stringify(formData, null, 2)}</pre>
        <Link to={"/"}>
        <button className='homeButton'>
          Back to home
        </button>
      </Link>
      </div>
    );
  }

  const stepConfig = steps[currentStep - 1];
  const activeTabIndex = getActiveTabIndex(stepConfig.stepLabel);

  return (
    <div>
      <FormStep
        currentStep={currentStep}
        totalSteps={steps.length}
        stepConfig={stepConfig}
        formData={formData}
        onNext={handleNext}
        onBack={currentStep > 1 ? handleBack : null}
        progressValue={progressValues[currentStep - 1]}
        tabLabels={tabLabels}
        activeTabIndex={activeTabIndex}
      />
      
    </div>
  );
}

const completionStyles = {
  homeButton:{
    width:"100px",
    height:"60px"
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    marginTop: '80px',
    fontFamily: 'system-ui, sans-serif',
    textAlign: 'center',
  },
  pre: {
    textAlign: 'left',
    background: '#f4f4f4',
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem',
  },
};
