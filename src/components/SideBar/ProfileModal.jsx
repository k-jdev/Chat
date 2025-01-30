import React from "react";
import { motion } from "framer-motion";
import "../../styles/ProfileModal.css";

const ProfileModal = ({ isVisible, onClose, currentUser, handleLogout }) => {
  const modalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="profile-modal-wrapper">
      {isVisible && (
        <motion.div
          className="profile-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <button className="profile-modal__close" onClick={onClose}>
            &times;
          </button>
          <div className="profile-modal__content">
            <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
            <p>{`${currentUser.id}`}</p>
            <ul>
              <li>View Profile</li>
              <li>Edit Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileModal;
