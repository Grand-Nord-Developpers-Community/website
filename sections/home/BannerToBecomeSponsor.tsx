import Image from "next/image"
import sponsorImage from '../../assets/images/commons/sponsorImage.png'

const BannerToBecomeSponsor = () => {
  return (
    <section className="w-full my-16 bg-lightGray py-4 px-4 rounded-md grid gap-4 sm:grid-cols-12 items-center">
        <div className="sm:col-span-2 border-2 border-red-500">
          <Image src={sponsorImage} alt="Become a sponsor of GDNC" className="w-full rounded-md shadow-md" />
        </div>
        <div className="sm:col-span-8 border-2 border-red-500">
          <p className="text-justify w-full text-xl text-black leading-normal">
          Devenez sponsor de la Grand Nord Developers Community  et soutenez l'innovation technologique dans le Grand Nord Cameroun, tout en faisant partie d'un mouvement qui façonne l'avenir numérique de la région.
          </p>
        </div>
        <div className="sm:col-span-2 border-2 border-red-500"></div>
    </section>
  )
}

export default BannerToBecomeSponsor