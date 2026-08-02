import Image from "next/image";
import type { Book } from "@/types";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  book: Book;
  className?: string;
  eager?: boolean;
}

export function BookCover({ book, className, eager }: BookCoverProps) {
  const hasCover = Boolean(book.cover);
  const src = book.cover || "/images/books/placeholder-cover.svg";

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-card", className)}>
      <Image
        src={src}
        alt={`${book.title} cover`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className={cn("object-cover", hasCover ? "object-top" : "object-center")}
        loading={eager ? "eager" : "lazy"}
        unoptimized
      />
    </div>
  );
}
