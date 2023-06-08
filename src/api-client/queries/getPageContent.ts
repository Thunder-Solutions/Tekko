type Content = {
  [key: PropertyKey]: string,
}

type PageMap = {
  [key: PropertyKey]: Content,
}

export const getPageContent = async (pageName: string) => {
  const pages: PageMap = {
    home: {
      coverImg: 'photos/photo.jpg',
      heading1: 'Register',
      heading2: 'Now!',
      content: 'Qui possimus aperiam et animi fuga ea minima omnis et voluptates voluptatem sit rerum numquam? Aut consequatur quos non autem deleniti non itaque incidunt.',
    },
  };
  return pages[pageName];
}
