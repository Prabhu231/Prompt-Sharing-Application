'use client'
import  { FormEvent } from 'react';
import Link from "next/link"

interface Post {
  prompt: string;
  tag: string;
}

interface FormProps {
  type: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: FormEvent) => void;
}

const Form =  ({ type, post, setPost, submitting, handleSubmit } : FormProps) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share prompts and let your imagination run wild
      </p>
      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span>Yout AI prompt</span>
          <textarea value={post.prompt} onChange={(e) => setPost( {...post,
            prompt: e.target.value}
          )}
          placeholder='Write your prompt here'
          required
          className='form_textarea'
          >

          </textarea>
        </label>
        <label>
          <span>Tag</span>
          <input value={post.tag} onChange={(e) => setPost( {...post,
            tag: e.target.value}
          )}
          placeholder='#tag'
          required
          className='form_input'
          >
          </input>
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="http://localhost:3000">
          Cancel
          </Link>
          <button type="submit" className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
