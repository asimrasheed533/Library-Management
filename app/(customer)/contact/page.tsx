import PageBanner from "@/components/PageBanner";
import "@/style/contact.scss";

export default function Contact() {
  return (
    <>
      <PageBanner title="Contact Us" />
      <div className="contact__info">
        <div className="contact__info__card">
          <svg
            width="52"
            height="58"
            viewBox="0 0 52 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 20.727L26.078 2L50.156 20.727V50.156C50.156 51.5752 49.5922 52.9362 48.5887 53.9397C47.5852 54.9432 46.2242 55.507 44.805 55.507H7.351C5.93183 55.507 4.57078 54.9432 3.56727 53.9397C2.56376 52.9362 2 51.5752 2 50.156V20.727Z"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.0508 55.5079V28.7539H34.1028V55.5079"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="contact__info__card__heading">Headoffice</div>
          <div className="contact__info__card__info">
            19 Stanley St, Manchester M8 8SH, UK
          </div>
        </div>

        <div className="contact__info__card">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.791763 9.80386C0.889686 9.07534 1.2087 8.39439 1.70576 7.85286L9.02176 0.536859C9.5911 0.0488588 10.0178 0.130192 10.3018 0.780859L16.2148 11.8809C16.3751 12.1862 16.4325 12.5351 16.3785 12.8757C16.3244 13.2162 16.1618 13.5302 15.9148 13.7709L13.2328 16.4529C12.7352 16.9631 12.4332 17.6322 12.3798 18.3429C12.5641 20.0521 13.2183 21.6768 14.2698 23.0369C15.383 24.7558 16.6263 26.3869 17.9888 27.9159L19.8788 29.8649C20.4488 30.4349 21.1788 31.1359 22.0788 31.9649C23.4671 33.171 24.9439 34.2715 26.4968 35.2569C28.5488 36.6189 30.1644 37.2995 31.3438 37.2989C31.7059 37.3068 32.0658 37.2405 32.4013 37.1042C32.7368 36.9678 33.0409 36.7642 33.2948 36.5059L36.4668 33.3359C36.6823 33.0692 36.9918 32.8952 37.3316 32.8498C37.6715 32.8045 38.0158 32.8911 38.2938 33.0919L48.9648 39.3709C49.0906 39.4318 49.2004 39.5214 49.2851 39.6326C49.3699 39.7438 49.4273 39.8734 49.4528 40.0109C49.4734 40.1386 49.462 40.2695 49.4194 40.3917C49.3768 40.514 49.3044 40.6236 49.2088 40.7109L41.8928 48.0269C41.352 48.5237 40.6716 48.8424 39.9438 48.9399C37.6643 49.1931 35.3572 48.9113 33.2058 48.1169C30.7586 47.3074 28.424 46.1908 26.2578 44.7939C24.1244 43.4125 22.1431 42.0125 20.3138 40.5939C18.4844 39.1752 17.0214 37.9559 15.9248 36.9359L14.3298 35.4069C13.9238 35.0009 13.3851 34.4422 12.7138 33.7309C12.0424 33.0195 10.8728 31.6195 9.20476 29.5309C7.63822 27.5789 6.19284 25.5327 4.87676 23.4039C3.58446 21.2547 2.52194 18.9755 1.70676 16.6039C0.860624 14.4434 0.54679 12.1111 0.791763 9.80386Z"
              fill="currentColor"
            />
          </svg>
          <div className="contact__info__card__heading">Phone</div>
          <div className="contact__info__card__info">+44 (161) 830 7342 </div>
        </div>

        <div className="contact__info__card">
          <svg
            width="57"
            height="47"
            viewBox="0 0 57 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.92684 2.28711H49.6268C51.041 2.29133 52.396 2.85497 53.396 3.85494C54.396 4.85491 54.9596 6.20995 54.9638 7.62411V39.6491C54.9599 41.0636 54.3962 42.4191 53.396 43.4193C52.3958 44.4195 51.0404 44.9832 49.6258 44.9871H6.92684C5.51251 44.9829 4.15732 44.4191 3.15733 43.4189C2.15733 42.4187 1.5938 41.0634 1.58984 39.6491V7.62411C1.59406 6.20995 2.15771 4.85491 3.15768 3.85494C4.15765 2.85497 5.51268 2.29133 6.92684 2.28711Z"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M54.9638 7.62402L28.2768 26.305L1.58984 7.62402"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className="contact__info__card__heading">Email</div>
          <div className="contact__info__card__info">
            sales@fundamentaltextiles.co.uk
          </div>
        </div>
      </div>
      <div className="contact__map__wrapper">
        <iframe
          className="contact__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d479.6449649026676!2d72.96311811350708!3d31.06454645458379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922f1aee1a4035f%3A0x1e765ba5546791d9!2sSamundri%2C%20Pakistan!5e0!3m2!1sen!2s!4v1748840046580!5m2!1sen!2s"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
