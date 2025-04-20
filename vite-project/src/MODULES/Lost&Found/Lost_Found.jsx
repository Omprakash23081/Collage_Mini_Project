function Lost_Found() {
  return (
    <>
      <header>
        <h1>Lost and Found</h1>
        <nav class="condation">
          <button>
            <a href="#post-item">Post an Item</a>
          </button>
          <button>
            <a href="#view-items">View Items</a>
          </button>
        </nav>
      </header>

      <section id="post-item">
        <form id="postForm">
          <label for="title">Item Title:</label>
          <input type="text" id="title" name="title" required />

          <label for="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
          ></textarea>

          <label for="status">Status:</label>
          <select id="status" name="status" required>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <label for="location">Location:</label>
          <input type="text" id="location" name="location" required />

          <label for="contact">Your Contact Info:</label>
          <input type="text" id="contact" name="contact" required />

          <label for="image">Upload Image:</label>
          <input type="file" id="image" name="image" accept="image/*" />

          <button type="submit">Post Item</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2024 Student Sport Portal. All rights reserved.</p>
      </footer>
    </>
  );
}
export default Lost_Found;
