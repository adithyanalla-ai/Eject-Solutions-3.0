export default function Toc({ items }: { items: { id: string; text: string }[] }) {
  if (items.length < 3) return null;
  return (
    <nav aria-label="Table of contents" className="glass p-5 text-sm">
      <p className="font-display font-medium mb-3">On this page</p>
      <ol className="space-y-2 text-muted">
        {items.map((i) => (<li key={i.id}><a className="hover:text-primary" href={`#${i.id}`}>{i.text}</a></li>))}
      </ol>
    </nav>
  );
}
