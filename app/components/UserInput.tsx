type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UserInput({ value, onChange }: Props) {
  return (
    <input className="Input"
      type="text"
      placeholder="Enter item"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}