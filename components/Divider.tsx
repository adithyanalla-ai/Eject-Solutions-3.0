import { DividerGlyph } from "./illustrations/scenes";

export default function Divider() {
  return (
    <div className="container-page flex items-center gap-4" aria-hidden="true">
      <hr className="emboss-rule flex-1" />
      <DividerGlyph className="lazy-art h-10 w-16" />
      <hr className="emboss-rule flex-1" />
    </div>
  );
}
