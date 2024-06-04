import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Here is your toast.');

const Test = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};

export default Test;