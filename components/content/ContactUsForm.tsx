import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import {
  FADE_LEFT_ANIMATION_VARIANTS,
  FADE_RIGHT_ANIMATION_VARIANTS,
} from "@/constants/animation";

const ContactForm = () => {
  return (
    <AnimationWaiting>
      <div className="container mx-auto relative rounded-xl">
        <motion.div variants={FADE_LEFT_ANIMATION_VARIANTS}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.98845989703!2d105.81632122590315!3d21.02273835481374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1702492106011!5m2!1svi!2s"
            className="w-full rounded-xl  h-[350px] lg:h-[600px]  border"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </motion.div>
        <motion.div
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="mb-5 lg:w-1/3 mx-auto lg:mt-0 lg:mb-0 lg:absolute top-0 bottom-0 overflow-y-auto"
        >
          <div className="lg:min-h-[600px] rounded-xl lg:rounded-r-none lg:p-6 backdrop-blur-[30px] bg-[hsla(0,0%,5%,0.8)]">
            <h2 className="mb-5 md:mb-10 text-2xl md:text-3xl text-center font-bold">
              Contact
            </h2>
            <form action="#" className="space-y-3 md:space-y-5">
              <div>
                <p className="mb-2 font-bold text-sm lg:text-base">Email</p>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm text-sm rounded-md w-full p-2.5"
                  placeholder="name@hypermovie.com"
                  required
                />
              </div>
              <div>
                <p className="mb-2 font-bold text-sm lg:text-base">Chủ đề</p>
                <input
                  type="text"
                  id="subject"
                  className="shadow-sm text-sm rounded-md w-full p-2.5"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <p className="mb-2 font-bold text-sm lg:text-base">Tin nhắn</p>
                <textarea
                  id="message"
                  rows={6}
                  className="shadow-sm text-sm rounded-md w-full p-2.5"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <Button variant={"destructive"} title="">
                Gửi
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimationWaiting>
  );
};

export default ContactForm;
