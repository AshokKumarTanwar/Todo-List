type Props = {
  items: any[];
  onDelete: (id: string) => void;
  onEdit: (item: any) => void;
  editId: string;
};

export default function ItemList({
  items,
  onDelete,
  onEdit,
  editId,
}: Props) {
  return (
    <ul>
      {items.map((item) => (
  <li key={item._id}>

  <span>{item.text}</span>

  <div className="btn-group">

    <button
      className="edit-btn"
      onClick={() => onEdit(item)}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => onDelete(item._id)}
    >
      Delete
    </button>

  </div>

</li>
      ))}
    </ul>
  );
}