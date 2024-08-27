import './Hero.css';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const Hero = () => {
  const takeAssessment = () => {
    setCloseModal(false);
    navigate('/assessmentPage');
  };
  
  const [modalOpen, setCloseModal] = useState(false);
  const navigate = useNavigate();
  
  const closeModal = () => setCloseModal(false);
  const openModal = () => setCloseModal(true);
  
  return (
    <div className='hero-container'>
      <div className="content">
        <h2 className='main-text'>Unlocking The Full Potential Of SMEs</h2>
        <h3 className='sub-text'>Grow With Technology</h3>
        <div className='type-wrapper'>
          <h3 className='sub-text2'>Unleash The Power Of</h3>
          <TypeAnimation
            className='type-animation'
            sequence={['AI', 1000, 'Big Data', 1000, 'Machine Learning', 1000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <button className='cta-button' onClick={openModal}>Get Started</button>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Get Started Modal"
        className="custom-modal"
        overlayClassName="modal-overlay"
      >
        <h2>Welcome to the SMEs Assessment Survey Tool</h2>
        <p>This tool will guide you through the process of assessing your SME's readiness for adopting technology.</p>
        <div className='modal-buttons'>
          <button onClick={closeModal} className='modal-button'>Close</button>
          <button onClick={takeAssessment} className='modal-button'>Take Survey</button>
        </div>
      </Modal>
    </div>
  );
};

export default Hero;
