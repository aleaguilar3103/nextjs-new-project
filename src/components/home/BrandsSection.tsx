import Image from "next/image";

export default function BrandsSection() {
  const brands = [
    {
      name: "Walmart",
      logo: "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/68df441bc268b13dec4f7c9d.png"
    },
    {
      name: "Amazon",
      logo: "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/68df441bbb793ac7c64a049f.png"
    },
    {
      name: "Target",
      logo: "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/68df441b142b71af17a405a7.png"
    },
    {
      name: "Costway",
      logo: "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/68df441b142b711ddfa405a6.png"
    },
    {
      name: "Costco",
      logo: "https://storage.googleapis.com/msgsndr/pvSYCYQR9RHbeg9BXuIL/media/68df441b5a4d7f3cfcb583a6.png"
    }
  ];

  return (
    <section className="relative -mt-12 mb-12 px-4 z-10">
      <div className="container mx-auto w-[90%]">
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] rounded-2xl shadow-2xl py-10 px-8">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {brands.map((brand) => (
              <div key={brand.name} className="relative h-16 w-40 md:h-20 md:w-48 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}