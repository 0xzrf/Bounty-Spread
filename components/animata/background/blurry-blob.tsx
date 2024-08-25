import { cn } from "../../../lib/utils";
interface BlobProps extends React.HTMLAttributes<HTMLDivElement> {
  firstBlobColor: string;
  secondBlobColor: string;
}

export default function BlurryBlob({
  className,
  firstBlobColor,
  secondBlobColor,
}: BlobProps) {
  return (
    <div className="min-h-52 min-w-52 flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        {/* First Blob */}
        <div
          className={cn(
            "absolute left-60 top-8 h-[12rem] w-[28rem] animate-pop-blob rounded bg-emerald-400 opacity-70 mix-blend-lighten blur-3xl filter",
            className,
            firstBlobColor,
          )}
        ></div>   
        
        {/* Second Blob */}
        <div
          className={cn(
            "absolute -left-30 top-8 h-[10rem] w-[24rem] animate-pop-blob rounded bg-zinc-500 opacity-60 mix-blend-lighten blur-3xl filter",
            className,
            secondBlobColor,
          )}
        ></div>
      </div>
    </div>
  );
}
