type BadgeProps = {
  text: string;
};

export default function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
      {text}
    </span>
  );
}
