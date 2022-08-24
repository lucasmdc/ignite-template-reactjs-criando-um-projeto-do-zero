import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as PrismicHelpers from '@prismicio/helpers';
import { RichTextField } from '@prismicio/types';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const first_publication_date = format(
    new Date(post.first_publication_date),
    'd MMM yyyy',
    { locale: ptBR }
  );

  const content = post.data.content.map(section => ({
    title: section.heading,
    text: PrismicHelpers.asHTML(section.body as RichTextField),
  }));

  return (
    <>
      <Head>[título_do_blog] | spacetraveling.</Head>
      <main>
        <article>
          <div className={styles.bannerContainer}>
            <img src={post.data.banner.url} alt="banner" />
          </div>
          <div className={styles.contentContainer}>
            <div>
              <h1>{post.data.title}</h1>
              <p className={commonStyles.details}>
                <span className={commonStyles.detail}>
                  <FiCalendar size={20} />
                  <time className={commonStyles.detailText}>
                    {first_publication_date}
                  </time>
                </span>
                <span className={commonStyles.detail}>
                  <FiUser size={20} />
                  <span className={commonStyles.detailText}>
                    {post.data.author}
                  </span>
                </span>
                <span className={commonStyles.detail}>
                  <FiClock size={20} />
                  <span className={commonStyles.detailText}>4 min</span>
                </span>
              </p>
            </div>
            <div>
              {content.map(section => (
                <div key={section.title}>
                  <h3>{section.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: section.text }} />
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient({});
  // const posts = await prismic.getByType(TODO);

  // TODO
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug));

  const { uid, first_publication_date } = response;

  const data = {
    title: response.data.title,
    subtitle: response.data.subtitle,
    banner: {
      url: response.data.banner.url,
    },
    author: response.data.author,
    content: response.data.content,
  };

  return {
    props: {
      post: {
        uid,
        first_publication_date,
        data,
      },
    },
  };
};
