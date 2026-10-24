import { CapScene, CloudApiScene, CodeScene, ContactScene, ContentScene, CornerAccent, CoverScene, DividerGlyph, EmptyScene, HeroScene, MailScene, NotFoundScene, PeopleScene, PhoneScene, ProcessIcon, ShieldScene, SuccessMark, AiScene } from "./scenes";

type SP = { title?: string; desc?: string; className?: string };

/** Registry. Add new scenes here, then they appear in /design/illustrations automatically. */
export const registry = {
  hero: HeroScene, code: CodeScene, phone: PhoneScene, cloud: CloudApiScene, shield: ShieldScene, people: PeopleScene,
  content: ContentScene, ai: AiScene, cap: CapScene, empty: EmptyScene, "not-found": NotFoundScene, mail: MailScene, contact: ContactScene,
  success: SuccessMark, corner: CornerAccent, divider: DividerGlyph,
  "process-discover": (p: SP) => <ProcessIcon name="discover" {...p} />, "process-build": (p: SP) => <ProcessIcon name="build" {...p} />,
  "process-secure": (p: SP) => <ProcessIcon name="secure" {...p} />, "process-automate": (p: SP) => <ProcessIcon name="automate" {...p} />,
  "cover-ai": (p: SP) => <CoverScene category="AI" {...p} />, "cover-cybersecurity": (p: SP) => <CoverScene category="Cybersecurity" {...p} />,
  "cover-software": (p: SP) => <CoverScene category="Software" {...p} />, "cover-hiring": (p: SP) => <CoverScene category="Hiring" {...p} />, "cover-compliance": (p: SP) => <CoverScene category="Compliance" {...p} />,
} as const;
export type IllustrationName = keyof typeof registry;

type Props = { name: IllustrationName; title?: string; desc?: string; className?: string };

/**
 * <Illustration name="shield" />               decorative (aria-hidden)
 * <Illustration name="shield" title="…" desc="…" />   meaningful (role=img, <title>/<desc>)
 */
export default function Illustration({ name, title, desc, className }: Props) {
  const Scene = registry[name] as (p: { title?: string; desc?: string; className?: string }) => React.JSX.Element;
  return <Scene title={title} desc={desc} className={className} />;
}
