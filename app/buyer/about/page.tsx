"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Intersection Observer hook for animations
  const useInView = (threshold = 0.1) => {
    const [isInView, setIsInView] = useState(false);
    const [ref, setRef] = useState(null);

    useEffect(() => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold }
      );

      observer.observe(ref);

      return () => {
        if (ref) observer.unobserve(ref);
      };
    }, [ref, threshold]);

    return [setRef, isInView];
  };

  // Team members data
  const teamMembers = [
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
      image: "/tim/iin.jpg",
    },
    {
      name: "Yesaya Gumulia",
      role: "Kepala Pemasaran",
      bio: "Dengan pengalaman 10 tahun di bidang digital marketing, Yesaya mengembangkan strategi promosi yang efektif untuk ToTong.",
      image: "/tim/yesa.png",
    },
  ];

  // Create refs for animated sections
  const [storyRef, storyInView] = useInView();
  const [visionRef, visionInView] = useInView();
  const [teamRef, teamInView] = useInView();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-orange-400 text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg md:text-xl">
              Perjalanan kami dalam membangun toko serba ada untuk memenuhi
              kebutuhan sehari-hari masyarakat Indonesia
            </p>
          </motion.div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute left-0 top-0 opacity-10">
          <svg width="300" height="300" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="white" />
          </svg>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="300" height="300" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="white" />
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <motion.div
              ref={storyRef}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  ToTong berawal dari mimpi sederhana untuk menciptakan tempat
                  belanja yang menyediakan segala kebutuhan dalam satu platform.
                  Didirikan pada tahun 2018 oleh Budi Santoso, kami memulai
                  sebagai toko online kecil dengan hanya 50 produk pilihan.
                </p>
                <p>
                  Nama "ToTong" berasal dari kata "Toko Lengkap Terpercaya",
                  yang mencerminkan komitmen kami untuk menjadi destinasi
                  belanja serba ada yang dapat diandalkan oleh semua orang.
                </p>
                <p>
                  Dalam perjalanan kami, tantangan terbesar adalah membangun
                  kepercayaan pelanggan dalam lingkungan e-commerce yang
                  kompetitif. Kami mengatasi hal ini dengan fokus pada kualitas
                  produk, layanan pelanggan yang responsif, dan pengiriman tepat
                  waktu.
                </p>
                <p>
                  Kini, ToTong telah berkembang menjadi platform belanja dengan
                  lebih dari 10.000 produk dan melayani pelanggan di seluruh
                  Indonesia. Kami bangga dapat menjadi bagian dari kehidupan
                  sehari-hari masyarakat Indonesia.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 relative h-80 md:h-96"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/store-history.png"
                  alt="Perusahaan ToTong"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-orange-100 rounded-lg -z-10"></div>
              <div className="absolute -top-5 -left-5 w-24 h-24 bg-orange-200 rounded-lg -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            ref={visionRef}
            initial="hidden"
            animate={visionInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-2">
              Visi & Misi
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 mb-16">
              Panduan kami dalam memberikan yang terbaik
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
                <p className="text-gray-700">
                  Menjadi platform belanja terpercaya nomor satu di Indonesia
                  yang memenuhi segala kebutuhan masyarakat dengan kemudahan,
                  kecepatan, dan keandalan tertinggi.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
                <ul className="text-gray-700 text-left space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      Menyediakan produk berkualitas dengan harga terjangkau
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      Memberikan pengalaman berbelanja yang nyaman dan efisien
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      Mengembangkan inovasi teknologi untuk meningkatkan layanan
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      Mendukung produsen lokal dan produk berkelanjutan
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-orange-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            ref={teamRef}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Tim Kami</h2>
            <p className="text-gray-600">
              Orang-orang hebat di balik kesuksesan ToTong
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64 w-full bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="flex mt-4 space-x-3">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-orange-500 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-orange-500 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-orange-500 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Nilai-Nilai Kami</h2>
            <p className="text-gray-600">
              Prinsip yang memandu kami dalam melayani Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-orange-50 rounded-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Kepercayaan</h3>
              <p className="text-gray-700">
                Kami berkomitmen untuk menjaga kepercayaan pelanggan dengan
                jujur, transparan, dan selalu memenuhi janji kami.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-orange-50 rounded-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Inovasi</h3>
              <p className="text-gray-700">
                Kami terus mencari cara baru untuk memperbaiki layanan kami dan
                memberikan pengalaman berbelanja yang lebih baik bagi pelanggan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-orange-50 rounded-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Kebersamaan</h3>
              <p className="text-gray-700">
                Kami percaya dalam membangun komunitas yang saling mendukung,
                baik di antara karyawan maupun dengan pelanggan kami.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-400 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Temukan Pengalaman Berbelanja Terbaik
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Jelajahi koleksi produk kami yang lengkap dan temukan kebutuhan
              Anda dengan harga terbaik
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-500 px-8 py-3 rounded-lg font-medium text-lg hover:bg-orange-50 transition"
              >
                Mulai Berbelanja
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
