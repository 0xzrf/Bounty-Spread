import { cn } from "@/lib/utils";
import { Action, Blink } from "@dialectlabs/blinks";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Should the marquee scroll horizontally or vertically.
   * If set to `true`, the marquee will scroll vertically.
   *
   * @default false
   */
  vertical?: boolean;

  /**
   * The number of times to repeat the children. Set this value so that the repeated children overflow the container.
   * @default 5
   */
  repeat?: number;

  /**
   * Reverse the marquee direction.
   */
  reverse?: boolean;

  /**
   * Pause the marquee animation on hover.
   */
  pauseOnHover?: boolean;

  /**
   * Apply a gradient mask to the marquee.
   * @default true
   */
  applyMask?: boolean;
  action: Action[]
}

export default function Marquee({
  action,
  vertical = false,
  repeat = 7,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative flex h-[30vw] w-full p-2 [--duration:7s] [--gap:50px] [gap:var(--gap)]",
        {
          "flex-col": vertical,
          "flex-row": !vertical,
        },
        className,
      )}
    >
      {action?.map((act, index) => (
        <div
          key={`item-${index}`}
          className={cn("flex shrink-0 [gap:var(--gap)]", {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
            "animate-marquee-horizontal flex-row h-[10rem] mb-16": !vertical,
            "animate-marquee-vertical flex-col": vertical,
          })}
        >
          <div className=" w-80">
            <Blink  action={act} stylePreset="x-dark" websiteText={new URL("https://github.com/").hostname} />
           </div>
        </div>
      ))}
      {applyMask && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
            {
              "bg-gradient-to-b": vertical,
              "bg-gradient-to-r": !vertical,
            },
          )}
        />
      )}
    </div>
  );
}
