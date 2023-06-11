const FeedbackModal = ({ onSubmit, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;
    onSubmit(feedback);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Provide Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedbackReason" className="font-bold mb-2">
              Reason:
            </label>
            <textarea
              className="w-full h-24 px-2 py-1 border border-gray-300 rounded"
              name="feedback"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
