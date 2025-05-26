import PageBanner from "@/components/PageBanner";
import "@/style/about.scss";
export default function About() {
  return (
    <>
      <PageBanner title="About Library Management" />
      <AboutCard
        image="https://media.istockphoto.com/id/505551939/photo/library.jpg?s=612x612&w=0&k=20&c=lGwjpaVR2__plgaEeRiLZ0n1up16Zm3PW6zlR4paabI="
        heading="Efficient Book Discovery"
        content1="Our library management system ensures that finding the right book is quick and easy. With an extensive catalog and advanced search features, you can locate your desired books in no time."
        content2="Our dedicated staff is always available to assist you with any queries. Whether you're looking for recommendations or need help navigating the system, we're here to make your experience seamless."
      />
      <AboutCard
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVxtsaxq2duEAoZCnHeD48mmvaaJrj1HJy-g&s"
        heading="Streamlined Borrowing and Returns"
        content1="Borrowing and returning books has never been simpler. Our system is designed to minimize wait times and ensure a hassle-free process for all users."
        content2="In case of any issues or concerns, our support team is ready to assist you. We aim to provide a smooth and efficient experience for all library members."
        reverse
      />
    </>
  );
}

function AboutCard({
  image,
  heading,
  content1,
  content2,
  reverse,
}: {
  image: string;
  heading: string;
  content1: string;
  content2: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`about__card__container ${
        reverse && "about__card__container__reverse"
      }`}
    >
      <div className="about__card__container__img">
        <img src={image} alt="honda parts now" />
      </div>
      <div className="about__card__content">
        <div className="about__card__content__heading">{heading}</div>
        <div className="about__card__content__text">
          {content1}
          <br />
          <br />
          {content2}
        </div>
      </div>
    </div>
  );
}
