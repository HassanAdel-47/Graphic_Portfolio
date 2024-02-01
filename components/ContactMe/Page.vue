<template>
  <div class="my-20">
    <h1 class="text-4xl text-primary_blue_color text-center mt-20">
      Contact Me
    </h1>
    <div
      class="flex flex-col mt-12 px-4 lg:px-12 space-x-14 h-full lg:flex-row justify-center lg:justify-between"
    >
      <div class="info text-justify mr-4">
        <p class="font-light w-full lg:w-5/6">
          Feel free to reach out to explore strategies for optimizing your
          business growth and development!
        </p>
        <div class="flex flex-col justify-around h-full">
          <CommonContactInfo
            icon="phone"
            title="Give me a ring so we can have a chat!"
            text="+963 985-942-976"
            :email="false"
          />
          <CommonContactInfo
            icon="envelope"
            title=" I'd love to dive into your project!"
            text="hassanadel3886@Gmail.com"
            :email="true"
          />
          <CommonContactInfo
            icon="comments"
            title="Otherwise, catch me lingering around these spots"
            :text="undefined"
            :email="false"
          />
        </div>
      </div>
      <div class="form !m-0 w-full lg:w-[35rem]">
        <form
          @submit.prevent="onSubmit"
          class="space-y-4 flex flex-col items-center justify-center border-2 border-primary_blue_color p-4 mt-10 lg:mt-0 rounded-xl"
        >
          <h1 class="text-3xl text-primary_blue_color">Send Me A Message</h1>
          <p class="text-sm font-light text-justify">
            Kindly complete the form provided below, and I'll get in touch with
            you at the earliest opportunity!
          </p>
          <!-- Name And E-mail -->
          <div
            class="flex flex-col lg:flex-row items-center justify-center space-y-7 !mt-7 !w-full"
          >
            <div class="mx-2">
              <span class="p-float-label">
                <InputText
                  id="name"
                  v-model="name"
                  type="text"
                  class="w-full sm:w-96 lg:w-full bg-slate-300"
                  :class="{ 'p-invalid': nameError }"
                  aria-describedby="text-error"
                />
                <label class="text-primary_blue_color" for="name"
                  >Your Name</label
                >
              </span>
              <small class="p-error text-[10px]" id="text-error">{{
                nameError || "&nbsp;"
              }}</small>
            </div>

            <div class="!my-0 mx-2">
              <span class="p-float-label">
                <InputText
                  id="email"
                  v-model="email"
                  type="email"
                  class="w-full sm:w-96 lg:w-full bg-slate-300"
                  :class="{ 'p-invalid': emailError }"
                  aria-describedby="text-error"
                />
                <label class="text-primary_blue_color" for="email"
                  >Your E-mail</label
                >
              </span>
              <small class="p-error text-[10px]" id="text-error">{{
                emailError || "&nbsp;"
              }}</small>
            </div>
          </div>
          <!-- Phone Number and Address -->
          <div
            class="flex-col lg:flex-row flex items-center justify-center space-y-7"
          >
            <div class="mx-2">
              <span class="p-float-label">
                <InputText
                  id="number"
                  v-model="number"
                  type="text"
                  class="w-full sm:w-96 lg:w-full bg-slate-300"
                  :class="{ 'p-invalid': numberError }"
                  aria-describedby="text-error"
                />
                <label class="text-primary_blue_color" for="number"
                  >Your Number</label
                >
              </span>
              <small class="p-error text-[10px]" id="text-error">{{
                numberError || "&nbsp;"
              }}</small>
            </div>

            <div class="!my-0 mx-2">
              <span class="p-float-label">
                <InputText
                  id="address"
                  v-model="address"
                  type="text"
                  class="w-full sm:w-96 lg:w-full bg-slate-300"
                  :class="{ 'p-invalid': addressError }"
                  aria-describedby="text-error"
                />
                <label class="text-primary_blue_color" for="address"
                  >Your Address</label
                >
              </span>
              <small class="p-error text-[10px]" id="text-error">{{
                addressError || "&nbsp;"
              }}</small>
            </div>
          </div>
          <!-- Message -->
          <div
            class="flex-col lg:flex-row flex items-center justify-center space-y-7 mb-7"
          >
            <div class="mx-2">
              <span class="p-float-label">
                <Textarea
                  id="message"
                  v-model="message"
                  type="text"
                  class="w-full sm:w-96 lg:w-full bg-slate-300"
                  :class="{ 'p-invalid': messageError }"
                  aria-describedby="text-error"
                />
                <label class="text-primary_blue_color" for="message"
                  >Your Message Here</label
                >
              </span>
              <small class="p-error text-[10px]" id="text-error">{{
                messageError || "&nbsp;"
              }}</small>
            </div>
          </div>

          <button
            class="border-2 border-primary_blue_color !m-0 px-5 hover:px-9 py-3 rounded-xl hover:bg-primary_blue_color duration-700 transition-all"
            type="submit"
            label="Submit"
          >
            Submit
          </button>
        </form>
      </div>
      <Toast
        position="top-right"
        :pt="{
          container: {
            class: isDark
              ? '!bg-slate-900 !text-primary_blue_color !border-primary_blue_color'
              : '',
          },
          closeButton: {
            class: isDark ? '!bg-slate-900 !text-primary_blue_color' : '',
          },
          icon: {
            class: isDark ? '!bg-slate-900 !text-primary_blue_color' : '',
          },
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { useField, useForm } from "vee-validate";
import { usePostsStore } from "~/store/data";
const allPostsStore = usePostsStore();
// get theme mode from
const isDark = computed(() => allPostsStore.isDark);
const toast = useToast();
const { handleSubmit, resetForm } = useForm();
const { value: name, errorMessage: nameError } = useField(
  "firstname",
  validateName
);
const { value: email, errorMessage: emailError } = useField(
  "email",
  validateEmail
);
const { value: number, errorMessage: numberError } = useField(
  "number",
  validateNumber
);
const { value: address, errorMessage: addressError } = useField(
  "address",
  validateAddress
);
const { value: message, errorMessage: messageError } = useField(
  "message",
  validateMessage
);

function validateName(value: any) {
  if (!value) {
    return "Don't forget to introduce yourself!";
  }

  return true;
}

function validateEmail(value: any) {
  if (!value) {
    return "Oops! E-mail field is feeling a little empty!";
  }

  return true;
}

function validateNumber(value: any) {
  if (!value) {
    return "Hey, Phone number might be taking a break!";
  }

  return true;
}

function validateAddress(value: any) {
  if (!value) {
    return "Ouch, Address field is feeling a little lonely!";
  }

  return true;
}

function validateMessage(value: any) {
  if (!value) {
    return "Seems like you didn't leave a message!";
  }

  return true;
}

const onSubmit = handleSubmit((values) => {
  toast.add({
    severity: "info",
    summary: "Info",
    detail: "Email has been sent!",
    life: 3000,
  });

  resetForm();
});
</script>
