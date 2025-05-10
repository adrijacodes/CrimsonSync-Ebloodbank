import { Fab, Webchat } from "@botpress/webchat";
import { useState } from "react";

function ChatComponent() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  // Toggle the state of the chat
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  // Manually define bot settings (Name, Description, Avatar)
  const botSettings = {
    botName: "Mr. Bleed", // Name of your bot
    botDescription: "Meet Mr. Bleed – your friendly, funny blood donation assistant! 💉🤖 He’ll help you with eligibility checks, donation tips, and all things blood-related.", // Description
    botAvatar: "https://your-avatar-url.com/avatar.png", // Replace with actual avatar URL
  };

  return (
    <>
      {/* Botpress Webchat Component */}
      <Webchat
        clientId="b09dbe20-8ca6-4df6-b1f9-5dc3e133a657" // Your client ID
        style={{
          width: "80vw", // 80% of viewport width
          maxWidth: "400px", // Max width for large screens
          height: "60vh", // 60% of viewport height
          maxHeight: "500px", // Max height constraint for readability
          display: isWebchatOpen ? "flex" : "none", // Show/hide based on state
          position: "fixed",
          bottom: "90px",
          right: "20px",
          flexDirection: "column",
          backgroundColor: "#ffffff", // White background for the chat
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Light shadow for depth
          overflow: "hidden", // Prevent content overflow
          zIndex: "1000", // Ensure chat stays on top of other elements
        }}
        // Override bot settings
        botName={botSettings.botName} // Bot's name
        botDescription={botSettings.botDescription} // Bot's description
        botAvatar={botSettings.botAvatar} // Bot's avatar image URL
        theme={{
          header: {
            backgroundColor: "#d32f2f", // Red background for the header
            color: "#ffffff", // White text in the header
          },
          bubble: {
            backgroundColor: "#d32f2f", // Red bubbles for bot messages
            color: "#ffffff", // White text in the bubbles
          },
          userBubble: {
            backgroundColor: "#f44336", // Lighter red for user messages
            color: "#ffffff", // White text in the user message bubbles
          },
        }}
      />

      {/* Floating Action Button (FAB) */}
      <Fab
        onClick={toggleWebchat}
        style={{
          position: "fixed",
          bottom: "20px", // Positioned at the bottom of the screen
          right: "20px", // Positioned at the right of the screen
          width: "60px", // Size of the button
          height: "60px", // Keep button round
          backgroundColor: "white", // White background for the FAB
          color: "#d32f2f", // Red color for the icon inside FAB
          borderRadius: "50%", // Make it round
          display: isWebchatOpen ? "none" : "flex", // Hide button when chat is open
          justifyContent: "center", // Center align icon inside FAB
          alignItems: "center", // Vertically center the icon
          fontSize: "30px", // Larger icon inside the FAB
          cursor: "pointer", // Pointer cursor on hover
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
          zIndex: "1000", // Keep FAB above other elements
        }}
        aria-label="Open Chat" // Accessibility: Label for button
      >
        💬 {/* Red chat bubble icon */}
      </Fab>
    </>
  );
}

export default ChatComponent;
