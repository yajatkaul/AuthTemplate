import Header from "@/components/local/Header";

const Page = () => {
  return (
    <>
      <Header />
      <div className="flex w-screen bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover"></div>
    </>
  );
};

export default Page;
