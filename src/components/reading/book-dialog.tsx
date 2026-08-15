"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookCover } from "@/components/reading/book-cover";
import type { Book } from "@/types";

interface BookDialogProps {
  book: Book | null;
  books: Book[];
  onSelect: (book: Book) => void;
  onClose: () => void;
}

export function BookDialog({ book, books, onSelect, onClose }: BookDialogProps) {
  const index = book ? books.findIndex((b) => b.id === book.id) : -1;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (books.length === 0) return;
      const next = (index + dir + books.length) % books.length;
      onSelect(books[next]);
    },
    [books, index, onSelect]
  );

  useEffect(() => {
    if (!book) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [book, go]);

  return (
    <Dialog open={!!book} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {book && (
          <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0 sm:max-h-[80vh]">
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col sm:grid sm:h-auto sm:grid-cols-[180px_1fr]"
            >
              <div className="relative h-40 w-full shrink-0 sm:h-auto sm:aspect-[2/3]">
                <BookCover book={book} eager />
              </div>

              <div className="flex min-h-0 flex-1 flex-col p-6 sm:max-h-[80vh]">
                <div className="min-h-0 flex-1 overflow-y-auto pr-1" data-lenis-prevent>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">{book.genre}</Badge>
                    {book.status === "Reading" && <Badge>Reading</Badge>}
                    {book.status === "Wishlist" && <Badge variant="outline">To Read</Badge>}
                    {book.favorite && (
                      <Badge variant="outline">
                        <Star className="mr-1 h-3 w-3 fill-accent text-accent" />
                        Favorite
                      </Badge>
                    )}
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{book.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {book.author}
                    {book.yearRead > 0 && (
                      <span className="mx-1.5 text-border">·</span>
                    )}
                    {book.yearRead > 0 && book.yearRead}
                  </p>

                  {book.rating ? (
                    <div
                      className="mt-3 flex items-center gap-0.5"
                      role="img"
                      aria-label={`Rated ${book.rating} out of 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < book.rating!
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">{book.rating}/5</span>
                    </div>
                  ) : null}

                  {book.thoughts && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {book.thoughts}
                    </p>
                  )}

                  {book.quote && (
                    <blockquote className="mt-4 border-l-2 border-accent pl-4">
                      <Quote className="mb-1 h-4 w-4 text-accent" />
                      <p className="text-sm italic leading-relaxed text-foreground/90">
                        &ldquo;{book.quote}&rdquo;
                      </p>
                    </blockquote>
                  )}

                  {book.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {book.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <button
                    onClick={() => go(-1)}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Previous book"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {index + 1} / {books.length}
                  </span>
                  <button
                    onClick={() => go(1)}
                    className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Next book"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
