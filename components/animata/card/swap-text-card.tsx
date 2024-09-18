import SwapText from "../text/swap-text";

interface FlipTextCardProps {
  initialText: string;
  finalText: string;
  title: string;
}

export default function SwapTextCard({ initialText, finalText, title }: FlipTextCardProps) {
  return (
    <div className="group flex min-h-64 w-full flex-col justify-between rounded-3xl bg-zinc-800 p-6 md:max-w-[500px] transition-all duration-300 hover:bg-gray-900">
      <h5 className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">{title}</h5>
      <div className="flex flex-col justify-between md:min-w-72">
        <div className="md:hidden">
          <div className="text-lg font-semibold text-gray-200">{initialText}</div>
          <div className="text-sm font-medium text-gray-400">{finalText}</div>
        </div>
        <SwapText
          initialText={initialText}
          finalText={finalText}
          disableClick
          className="-mb-7 hidden min-h-20 w-3/4 transition-all duration-200 group-hover:mb-0 md:flex md:flex-col"
          initialTextClassName="text-2xl  group-hover:opacity-0 h-full duration-200 p-1 font-bold text-gray-200"
          finalTextClassName="text-sm h-full duration-200 font-medium text-gray-400"
        />
      </div>
    </div>
  );
}
