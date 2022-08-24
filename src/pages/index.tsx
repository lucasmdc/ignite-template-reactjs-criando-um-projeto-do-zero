import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const formatDate = (date: string): string =>
  format(new Date(date), 'd MMM yyyy', { locale: ptBR });

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>
      <main className={styles.contentContainer}>
        {postsPagination.results.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <a>
              <dl className={styles.box}>
                <dt className={styles.title}>{post.data.title}</dt>
                <dd>
                  <p className={styles.subtitle}>{post.data.subtitle}</p>
                  <p className={commonStyles.details}>
                    <span className={commonStyles.detail}>
                      <FiCalendar size={20} />
                      <time className={commonStyles.detailText}>
                        {formatDate(post.first_publication_date)}
                      </time>
                    </span>
                    <span className={commonStyles.detail}>
                      <FiUser size={20} />
                      <span className={commonStyles.detailText}>
                        {post.data.author}
                      </span>
                    </span>
                  </p>
                </dd>
              </dl>
            </a>
          </Link>
        ))}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts');

  const next_page = { postsResponse };
  const results = postsResponse.results.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
    },
  }));

  return {
    props: {
      postsPagination: {
        results,
        next_page,
      },
    },
  };
};
