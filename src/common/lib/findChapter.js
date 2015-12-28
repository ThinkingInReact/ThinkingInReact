function findChapter(chapters, slug) {
  const index = chapters.findIndex(chapter => chapter.slug == slug)
  if(index == -1) {
    return null;
  }

  const chapter = chapters[index];
  return { chapter, index };
}

export default findChapter;
