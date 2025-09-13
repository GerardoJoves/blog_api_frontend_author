import { Form } from 'react-router';

type PostFormProps = {
  title?: string;
  content?: string;
  featuredImg?: string;
  published?: boolean;
};

export default function PostForm({
  title = '',
  content = '',
  featuredImg = '',
  published = true,
}: PostFormProps) {
  return (
    <Form method="post" className="px-4">
      <section className="mb-4">
        <label htmlFor="title" className="block">
          Title
        </label>
        <textarea
          cols={60}
          name="title"
          id="title"
          className="border border-white p-2 resize"
          defaultValue={title}
        />
      </section>
      <section className="mb-4">
        <label htmlFor="featured-image" className="block">
          Featured Image
        </label>
        <textarea
          cols={60}
          name="featuredImg"
          id="featured-image"
          className="border border-white p-2 resize"
          defaultValue={featuredImg}
        />
      </section>
      <section className="flex gap-4 mb-4">
        <input type="checkbox" name="published" defaultChecked={published} />
        <label htmlFor="published">Published</label>
      </section>
      <section>
        <label htmlFor="content" className="block">
          Content:
        </label>
        <textarea
          name="content"
          cols={60}
          id="content"
          className="border border-white p-2 resize"
          defaultValue={content}
        />
      </section>
      <button type="submit" className="hover:cursor-pointer">
        Submit
      </button>
    </Form>
  );
}
