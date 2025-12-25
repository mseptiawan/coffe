export default function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-md bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-100">
      {text}
    </span>
  );
}