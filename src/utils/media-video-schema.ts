type MediaVideo = {
  title: string;
  file: string;
  thumb: string;
};

function encodeMediaPath(file: string): string {
  return file
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
}

export function buildVideoLibrarySchema(siteUrl: string, videos: MediaVideo[], pageUrl: string) {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#videos`,
    name: 'Rayenna Energy Video Library',
    numberOfItems: videos.length,
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name: video.title,
        description: `${video.title} — Rayenna Energy solar installation and education video`,
        thumbnailUrl: `${siteUrl}/media/${encodeMediaPath(video.thumb)}`,
        contentUrl: `${siteUrl}/media/${encodeMediaPath(video.file)}`,
        publisher: {
          '@id': `${siteUrl}/#business`,
        },
      },
    })),
  };
}
