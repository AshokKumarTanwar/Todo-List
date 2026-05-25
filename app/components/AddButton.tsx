type Props = {
  onClick: () => void;
  loading: boolean;
};

export default function AddButton({
  onClick,
  loading,
}: Props) {
  return (
    <button
      className="add-btn"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Adding..." : "Add Task"}
    </button>
  );
}