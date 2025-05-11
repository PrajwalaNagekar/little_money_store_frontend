import { motion } from 'framer-motion';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SwipeButtonProps {
  onSwipe?: () => void;
  score: number; // Pass the score as a prop
}

const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipe, score }) => {
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const [color, setColor] = useState<string>('white');
  const [iconColor, setIconColor] = useState<string>('black');

  const handleDragEnd = (event: any, info: any) => {
    if (info.point.x > 150) {
      setIsSwiped(true);
      if (score < 500) {
        setColor('#f23a3a');
        // setIconColor('red');
        // toast.error('Insufficient points! You need at least 500 points.');
        return;
      } else {
        setColor('green');
        // setIconColor('green');
        // toast.success('Points credited successfully!');
        onSwipe && onSwipe(); // Call the function when swiped
      }
    } else {
      setIsSwiped(false); // Reset if not swiped far enough
      setColor('white');
      setIconColor('blue');
    }
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className="relative w-64 h-14 border rounded-full flex items-center p-1 transition-all duration-300"
    >
      <motion.div
        onDragEnd={handleDragEnd}
        className={`w-12 h-12 ${
          iconColor === 'green' ? 'bg-green-500' : iconColor === 'red' ? 'bg-red-500' : 'bg-blue-500'
        } rounded-full flex items-center justify-center text-white font-bold cursor-pointer z-10`}
        drag="x" // Enable horizontal dragging
        dragConstraints={{ left: 0, right: 200 }} // Constrain dragging within the parent div
        dragElastic={0} // Prevent dragging beyond constraints
        aria-label="Swipe to confirm"
      >
        ▶
      </motion.div>
      {!isSwiped ? (
        <p className="absolute left-16 text-black">Swipe to Confirm</p>
      ) : color === 'green' ? (
        <p className="absolute left-16 text-white font-semibold">Confirmed!</p>
      ) : (
        <p className="absolute left-16 text-white font-semibold">Not Eligible!</p>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default SwipeButton;