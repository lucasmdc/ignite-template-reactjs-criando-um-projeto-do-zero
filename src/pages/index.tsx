import { GetStaticProps } from 'next';
import Head from 'next/head';

import { FiCalendar, FiUser } from 'react-icons/fi';
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

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>
      <main className={styles.contentContainer}>
        <a>
          <dl className={styles.box}>
            <dt className={styles.title}>Como utilizar Hooks</dt>
            <dd>
              <p className={styles.subtitle}>
                Pensando em sincronização em vez de ciclos de vida.
              </p>
              <p className={commonStyles.details}>
                <span className={commonStyles.detail}>
                  <FiCalendar size={20} />
                  <time
                    className={commonStyles.detailText}
                    dateTime="2021-03-15"
                  >
                    15 Mar 2021
                  </time>
                </span>
                <span className={commonStyles.detail}>
                  <FiUser size={20} />
                  <span className={commonStyles.detailText}>
                    Joseph Oliveira
                  </span>
                </span>
              </p>
            </dd>
          </dl>
        </a>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
