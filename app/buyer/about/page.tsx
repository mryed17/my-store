"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// Custom Hook: Intersection Observer
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (elementRef.current) {
      observer?.unobserve(elementRef.current);
    }

    if (node) {
      observer?.observe(node);
    }

    elementRef.current = node;
  }, []);

  let observer: IntersectionObserver | null = null;

  useEffect(() => {
    if (!elementRef.current) return;

    observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => observer?.disconnect();
  }, [threshold]);

  return [setRef, isInView] as const;
};

export default function About() {
  const teamMembers = useMemo(
    () => [
      {
        name: "Merryanti",
        role: "Pendiri & CEO",
        bio: "Merry mendirikan ToTong pada tahun 2025 dengan visi menjadi toko serba ada terpercaya di Indonesia. Pengalamannya lebih dari 15 tahun di dunia retail.",
        image: "/tim/merry.png",
      },
      {
        name: "Iin Sinambela",
        role: "Manajer Operasional",
        bio: "Iin memastikan semua operasional ToTong berjalan lancar. Bertanggung jawab atas inventaris dan logistik hingga ke tangan pelanggan.",
        image: "/tim/iin.png",
      },
      {
        name: "Yesaya Gumulia",
        role: "Kepala Pemasaran",
        bio: "Dengan pengalaman 10 tahun di bidang digital marketing, Yesaya mengembangkan strategi promosi yang efektif untuk ToTong.",
        image: "/tim/yesa.jpg",
      },
    ],
    []
  );

  const [storyRef] = useInView();
  const [visionRef] = useInView();
  const [teamRef] = useInView();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-orange-400 text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tentang ToTong
          </h1>
          <p className="text-lg md:text-xl">
            Perjalanan kami dalam membangun toko serba ada untuk memenuhi
            kebutuhan masyarakat Indonesia
          </p>
        </div>
        {/* Decorative SVGs */}
        <svg
          className="absolute left-0 top-0 w-72 h-72 opacity-10"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" fill="white" />
        </svg>
        <svg
          className="absolute right-0 bottom-0 w-72 h-72 opacity-10"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80" fill="white" />
        </svg>
      </section>

      {/* Cerita Kami */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 space-y-4" ref={storyRef}>
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              Cerita Kami
            </h2>
            <p>
              ToTong berawal dari mimpi sederhana untuk menciptakan tempat
              belanja yang menyediakan segala kebutuhan dalam satu platform...
            </p>
            <p>
              Nama "ToTong" berasal dari kata "Toko Kelontong Lengkap
              Terpercaya"...{" "}
            </p>
            <p>
              Dalam perjalanan kami, tantangan terbesar adalah membangun
              kepercayaan pelanggan...
            </p>
            <p>
              Kini, ToTong telah berkembang menjadi platform belanja dengan
              lebih dari 10.000 produk...
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 md:h-96">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/image.png"
                alt="ToTong Company"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-orange-100 rounded-lg -z-10"></div>
            <div className="absolute -top-5 -left-5 w-24 h-24 bg-orange-200 rounded-lg -z-10"></div>
          </div>
        </div>
      </section>

      {/* Visi dan Misi */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div
          className="container mx-auto px-4 md:px-8 text-center"
          ref={visionRef}
        >
          <h2 className="text-3xl font-bold text-orange-500 mb-2">
            Visi & Misi
          </h2>
          <p className="text-gray-600 mb-16">
            Panduan kami dalam memberikan yang terbaik
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
              <p className="text-gray-700">
                Menjadi platform belanja terpercaya nomor satu di Indonesia yang
                memenuhi segala kebutuhan masyarakat dengan kemudahan,
                kecepatan, dan keandalan tertinggi.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
              <ul className="text-gray-700 text-left space-y-2 list-disc pl-5">
                <li>Menyediakan produk berkualitas dengan harga terjangkau</li>
                <li>
                  Memberikan pengalaman berbelanja yang nyaman dan efisien
                </li>
                <li>
                  Mengembangkan inovasi teknologi untuk meningkatkan layanan
                </li>
                <li>Mendukung produsen lokal dan produk berkelanjutan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Kami */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16" ref={teamRef}>
            <h2 className="text-3xl font-bold text-orange-500 mb-2">
              Tim Kami
            </h2>
            <p className="text-gray-600">
              Orang-orang hebat di balik kesuksesan ToTong
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-orange-500 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
