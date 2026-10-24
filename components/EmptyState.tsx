import Illustration from "./illustrations/Illustration";

export default function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="panel panel-lg mx-auto mt-10 flex max-w-xl flex-col items-center p-8 text-center">
      <Illustration name="empty" className="lazy-art h-auto w-56" />
      <h2 className="mt-2 text-2xl">{title}</h2>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </div>
  );
}
