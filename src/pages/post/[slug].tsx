import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

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

export default function Post(): JSX.Element {
  return (
    <>
      <Head>[título_do_blog] | spacetraveling.</Head>
      <main>
        <article>
          <div className={styles.bannerContainer}>
            <img src="/images/Banner.jpg" alt="banner" />
          </div>
          <div className={styles.contentContainer}>
            <div>
              <h1>
                O que é a arquitetura TCP/IP e como ela funciona dentro do
                modelo cliente-servidor para requisições HTTP
              </h1>
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
                <span className={commonStyles.detail}>
                  <FiClock size={20} />
                  <span className={commonStyles.detailText}>4 min</span>
                </span>
              </p>
            </div>
            <div>
              <h3>Introdução</h3>
              <p>
                A maioria dos <strong>usuários</strong> entendem que, para que o
                navegador, seja ele o <em>Chrome</em>, Firefox, Opera, Mozilla,
                Edge, Safari, ou quaisquer outros (incluindo também os
                navegadores dos dispositivos móveis), possa exibir uma página
                web de um
                <a href="página_web">site</a>
                ,basta apenas com que eles digitem o nome de domínio do servidor
                web (por exemplo &quot; www.google.com&quot;) e pressionem a
                tecla &quot;Enter&quot; para que a &quot;mágica&quot; aconteça.
              </p>
              <p>
                O que eles não sabem é que, por trás de toda essa
                &quot;mágica&quot;,existe uma série de exigências a serem
                cumpridas e, quem é responsável por normaliza-las e regê-las, é
                a arquitetura TCP/IP que possui, em sua estrutura, o modelo de
                camadas, contento um conjunto de protocolos em cada uma delas.
              </p>
              <p>
                Para cada solicitação do usuário a uma determinada página web de
                um site, existirá o acionamento de um protocolo em especial,
                responsável por realizar essa busca. Ele é o HTTP (HyperText
                Transfer Protocol).
              </p>
              <p>
                Em vista disto, este artigo tem, como objetivo, passar alguns
                conceitos introdutórios sobre o que consiste a arquitetura
                TCP/IP e o seu funcionamento dentro do modelo cliente-servidor,
                envolvendo requisições HTTP.
              </p>
              <h3>Objetivo</h3>
              <p>
                Os conceitos que serão apresentados sobre a arquitetura TCP/IP
                envolveram o seu significado, estrutura e detalhes breves do seu
                funcionamento dentro do modelo cliente-servidor a partir de
                requisições HTTP.
              </p>
              <ul>
                <li>
                  Sobre a estrutura da arquitetura TCP/IP, serão abordadas as
                  camadas que a compõem (Aplicação, Transporte, Rede e Enlace),
                  juntamente com as suas respectivas descrições e alguns dos
                  seus principais protocolos (HTTP, DNS, TCP, UDP, IP e ARP)
                  contido em cada um destas camadas.
                </li>
                <li>
                  Em relação ao modelo cliente-servidor, será apresentado um
                  resumo sobre o que ele é e o seu funcionamento envolvendo a
                  arquitetura TCP/IP.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   // TODO
// };

// export const getStaticProps = async ({params }) => {
//   const prismic = getPrismicClient({});
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
