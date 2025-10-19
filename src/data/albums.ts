export type Album = {
  name: string;
  location: string;
  date: Date;
  cover: string;
};

export type AlbumCollection = {
  title: string;
  description: string;
  year: Date;
  albums: Album[];
};

export const albumCollections: AlbumCollection[] = [
  {
    title: "Азид болон Европт хийгдсэн аяллууд",
    description:
      "Азид болон Европт хийгдсэн түүхэн аяллууд, шинэ соёлын түншлэлүүдээр дүүрэн жил.",
    year: new Date("2024-01-01"),
    albums: [
      {
        name: "Hoops & Heritage Tour",
        location: "Сөүл ба Пусан, Өмнөд Солонгос",
        date: new Date("2024-04-01"),
        cover:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Gateway U18 Урилгат тэмцээн",
        location: "Сингапур",
        date: new Date("2024-08-01"),
        cover:
          "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Хөгжлийн хосолсон хөтөлбөрүүд",
    description:
      "Хөгжлийн хосолсон хөтөлбөрүүд болон олон нийттэй харилцах үйл ажиллагаагаар аяллаа дахин эхлүүлсэн жил.",
    year: new Date("2023-01-01"),
    albums: [
      {
        name: "Island Serve Classic",
        location: "Себу, Филиппин",
        date: new Date("2023-12-01"),
        cover:
          "https://images.unsplash.com/photo-1517341723685-0189ff20c950?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Euro Discovery Series",
        location: "Парис ба Амстердам",
        date: new Date("2023-08-01"),
        cover:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Future Stars Academy",
        location: "Куала Лумпур, Малайз",
        date: new Date("2023-09-01"),
        cover:
          "https://images.unsplash.com/photo-1529429617124-aee3712c8f31?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];
