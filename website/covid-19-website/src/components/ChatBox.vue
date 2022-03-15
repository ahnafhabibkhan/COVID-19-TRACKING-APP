<template>
  <v-card
    elevation="15"
    width="340"
    style="border-radius: 15px; opacity: 95%; margin: auto"
  >
    <section ref="chatArea" class="chat-area">
      <p
        v-for="(message, i) in messages"
        :key="i"
        class="message"
        :class="{
          'message-out': message.ReceiveUserID != $store.state.user.UserID,
          'message-in': message.ReceiveUserID == $store.state.user.UserID,
        }"
      >
        {{ message.Text }}
      </p>
    </section>

    <section class="chat-inputs">
      <form @submit.prevent="sendMessage()" id="person1-form">
        <label for="person1-input">Bob</label>
        <input
          v-model="youMessage"
          id="person1-input"
          type="text"
          placeholder="Type your message"
          width="50"
        />
        <button type="submit" style="margin-left: 80px">Send</button>
      </form>

      <!-- <form @submit.prevent="sentMessages('out')" id="person2-form">
        <label for="person2-input">You</label>
        <input
          v-model="youMessage"
          id="person2-input"
          type="text"
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form> -->
    </section>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "ChatBox",

  components: {},
  data: function () {
    return {
      youMessage: "",
      messages: [],
    };
  },

  // mounted() {
  //   document.onreadystatechange = () => {
  //     if (document.readyState == "complete") {
  //       console.log("Page completed with image and files!");
  //       setInterval(function () {
  //         this.getMessages();
  //       }, 1000); // fetch
  //     }
  //   };
  // },

  created() {
    this.getMessages();
  },

  methods: {
    sendMessage() {
      if (!this.youMessage) {
        return;
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();
      const currentMessage = {
        SendUserID: this.$store.state.user.UserID,
        ReceiveUserID: this.$store.state.selectedUser,
        Text: this.youMessage,
        Location: "MTL", // TODO: Get user's location from their profile
        State: "Sent",
        Date: ""+year+"-"+month+"-"+day,
        Time: ""+hour+":"+minute+":"+second
      }
      this.messages.push(currentMessage);
      //this.bobMessage = "";
      this.sentMessages(currentMessage);
      //this.getMessages();
    },
    clearAllMessages() {
      this.messages = [];
    },
    async getMessages() {
      try {

        const ct = true;
        while(ct) {
          console.log("Getting messages between "+this.$store.state.user.UserID+" and "+this.$store.state.selectedUser);
          const messagesResponse = await axios.get(
            `http://localhost:5000/messages/${this.$store.state.user.UserID}/${this.$store.state.selectedUser}`
          );
          this.messages = messagesResponse.data;
          if(this.messages && this.messages.length > 0) {
            // Check if latest is read or not
            if (this.messages[this.messages.length - 1].ReceiveUserID == this.$store.state.user.UserID && this.messages[this.messages.length - 1].State == 'Sent') {
              // TODO: Show that there is new message to read
            }
          }

          // Wait 2s before checking for new messages
          await new Promise(r => setTimeout(r, 2000));
        }
      } catch (err) {
        console.log(err);
      }
    },
    async sentMessages(message) {
      try {
        await axios.post(`http://localhost:5000/message/`, message);

      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
body,
html {
  font-family: sans-serif;
  font-weight: 100;
  background: #7b4397; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #dc2430,
    #7b4397
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #dc2430,
    #7b4397
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  /*   border: 1px solid #ccc; */

  height: 50%;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
  font-size: 0.8em;
}
.message-out {
  background: #407fff;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: 0.5em;
}
#person2-input {
  padding: 0.5em;
}
</style>
