import { FittedText } from '@/components/site-elements';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { externalLinks } from '../data';
import { MisakiGallery } from './misaki-gallery';
import './misaki.css';

export const metadata: Metadata = {
  title: 'Misakiについて | BarMisaki',
  description:
    'VISION TOKYO・BLUESTELLA制作のVRChat向けアバター「海咲 -Misaki-」。公式PV、制作へのこだわり、BarMisakiのキャストたちによる多彩な改変をご紹介します。',
};

const videoUrl = 'https://www.youtube.com/watch?v=Ubmy48zaJAI';

export default function MisakiPage() {
  return (
    <main className="misaki-page">
      <section className="misaki-opening" aria-labelledby="misaki-title">
        <div className="misaki-cinema">
          <div className="misaki-film">
            <iframe
              src="https://www.youtube.com/embed/Ubmy48zaJAI?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=Ubmy48zaJAI"
              title="海咲 -Misaki- 公式プロモーションPV（Long Ver.）"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
        <div className="misaki-film-details">
          <div className="misaki-opening-heading">
            <h1 id="misaki-title">Misakiについて</h1>
            <span className="misaki-edition">
              海咲 −Misaki− / ORIGINAL 3D AVATAR
            </span>
          </div>
        <div className="misaki-film-caption">
          <span>OFFICIAL PROMOTION FILM / LONG VER.</span>
          <a href={videoUrl} target="_blank" rel="noreferrer">
            YouTubeで見る <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="misaki-video-note">
          海咲 -Misaki- ｜ 公式プロモーションPV（Long Ver.）
        </p>
        <p className="misaki-video-production">
          PV Production{' '}
          <a href="https://x.com/vkkoox" target="_blank" rel="noreferrer">
            あれ。（@vkkoox） <ArrowUpRight size={13} />
          </a>
        </p>
        </div>
      </section>

      <section
        className="misaki-story misaki-wrap"
        aria-labelledby="misaki-story-title"
      >
        <div>
          <p className="misaki-eyebrow">BEAUTY, WITH A PERSONALITY.</p>
          <h2 id="misaki-story-title"><FittedText>
            凛と、美しく。
            <em>ふと、愛らしく。</em>
          </FittedText></h2>
          <p className="misaki-story-sign display">
            海咲 <span>−Misaki−</span>
          </p>
        </div>
        <div className="misaki-story-copy">
          <p>
            BarMisakiの夜を彩るのは、ひとりひとりの個性を映した「海咲」。スタイリッシュな佇まいと、思わず惹かれるやわらかな表情。そのどちらも楽しめるアバターです。
          </p>
          <blockquote cite={externalLinks.misakiBooth}>
            <p>
              海咲は、スタイリッシュさと美しさ、そしてキュートさを兼ね備えた、VRChat向けオリジナル3Dアバターです。
            </p>
            <p>
              都会でモデルとして活動しながら、自分らしい世界観を大切に生きる女性。
              <br />
              クールなファッションを纏いながらも、ふっとした瞬間明るくやわらかな一面を見せるような存在をイメージして制作されました。
            </p>
            <footer>
              引用：
              <a
                href={externalLinks.misakiBooth}
                target="_blank"
                rel="noreferrer"
              >
                VISION TOKYO「海咲 -Misaki-」BOOTH商品説明{' '}
                <ArrowUpRight size={14} />
              </a>
            </footer>
          </blockquote>
          <dl className="misaki-credits">
            <div>
              <dt>CREATED BY</dt>
              <dd>
                <a
                  href="https://visiontokyo.booth.pm/"
                  target="_blank"
                  rel="noreferrer"
                >
                  VISION TOKYO
                </a>
                <span> / BLUESTELLA</span>
              </dd>
            </div>
            <div>
              <dt>DESIGNED BY</dt>
              <dd>
                <a href="https://x.com/Nya_rl" target="_blank" rel="noreferrer">
                  甘音しぃら <ArrowUpRight size={15} />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="misaki-features misaki-wrap"
        aria-labelledby="misaki-features-title"
      >
        <div className="misaki-section-heading">
          <p className="misaki-eyebrow">MADE TO BE YOURS</p>
          <h2 id="misaki-features-title"><FittedText>
            好きな姿へ。
            自然な表情のまま。
          </FittedText></h2>
          <p>
            見た目の美しさだけでなく、毎日使うアバターとしての扱いやすさまで。
            <br />
            公式商品説明で紹介されている、海咲のこだわりです。
          </p>
        </div>
        <div className="misaki-feature-grid">
          <article>
            <span className="misaki-feature-number display">532</span>
            <h3>表情の選択肢</h3>
            <p>
              豊富な表情シェイプキーを実装。好みの表情をつくり込み、幅広い改変を楽しめます。
            </p>
          </article>
          <article>
            <span className="misaki-feature-number display">Fit</span>
            <h3>改変に寄り添う設計</h3>
            <p>
              従来のアバターに合わせた規格設定・シェイプキー名を採用。多数のBody用シュリンクシェイプキーで、衣装の貫通対策にも配慮されています。
            </p>
          </article>
          <article>
            <span className="misaki-feature-number display">Simply</span>
            <h3>そのままでも、愛らしく</h3>
            <p>
              デフォルトの状態でも可愛く使いやすいデザイン。初めての方にも扱いやすく、自然に楽しめることを目指して制作されています。
            </p>
          </article>
        </div>
        <p className="misaki-source">
          出典・要約：
          <a href={externalLinks.misakiBooth} target="_blank" rel="noreferrer">
            VISION TOKYO「海咲 -Misaki-」商品説明
          </a>
          。仕様・利用条件の詳細は販売ページをご確認ください。
        </p>
      </section>

      <section
        className="misaki-variations"
        aria-labelledby="misaki-variations-title"
      >
        <div className="misaki-wrap misaki-section-heading">
          <p className="misaki-eyebrow">ONE MISAKI. SO MANY EXPRESSIONS.</p>
          <h2 id="misaki-variations-title"><FittedText>
            同じ海咲から、<em>こんなにも自由に。</em>
          </FittedText></h2>
          <p>
            髪、衣装、メイク、そして表情。
            <br />
            BarMisakiのキャスト・スタッフが楽しむ、それぞれの海咲。
          </p>
        </div>
        <MisakiGallery />
        <p className="misaki-gallery-note misaki-wrap">
          掲載写真はBarMisakiのキャスト・スタッフによる改変例です。髪型・衣装・小物などには、海咲本体に含まれないアイテムや個別の改変が含まれます。
        </p>
      </section>

      <section
        className="misaki-pv-details misaki-wrap"
        aria-labelledby="misaki-pv-title"
      >
        <div>
          <p className="misaki-eyebrow">OFFICIAL FILM & CREDITS</p>
          <h2 id="misaki-pv-title"><FittedText>
            「静かなときめきを、
            <em>あなたに。」</em>
          </FittedText></h2>
          <p className="misaki-source">引用：VISION TOKYO 公式XのPV告知</p>
        </div>
        <div>
          <p>
            海咲の世界観を伝える公式プロモーションPV。映像に込められた表情や佇まいも、ぜひ大きな画面でお楽しみください。
          </p>
          <dl className="misaki-pv-facts">
            <div>
              <dt>作品</dt>
              <dd>海咲 -Misaki- プロモーションPV / Long Ver.</dd>
            </div>
            <div>
              <dt>告知元</dt>
              <dd>
                <a
                  href={externalLinks.visionTokyoX}
                  target="_blank"
                  rel="noreferrer"
                >
                  VISION TOKYO（@VisionTokyo2026）
                </a>
                <br />
                2026年5月13日 公開告知
              </dd>
            </div>
            <div>
              <dt>PV Production</dt>
              <dd>
                <a href="https://x.com/vkkoox" target="_blank" rel="noreferrer">
                  あれ。（@vkkoox） <ArrowUpRight size={15} />
                </a>
              </dd>
            </div>
            <div>
              <dt>発売告知</dt>
              <dd>2026年5月14日 18:00 ON SALE</dd>
            </div>
          </dl>
          <p className="misaki-source">
            クレジット・告知内容はVISION
            TOKYOの公式XでのPV公開告知（2026年5月13日）より引用・転載。動画は
            <a href={videoUrl} target="_blank" rel="noreferrer">
              公式YouTube公開動画
            </a>
            の埋め込みです。映像および原文の権利は各権利者に帰属します。
          </p>
        </div>
      </section>

      <section className="misaki-thanks misaki-wrap">
        <p className="misaki-eyebrow">WITH LOVE & RESPECT</p>
        <h2><FittedText>
          この出会いは、
          <em>海咲からはじまった。</em>
        </FittedText></h2>
        <p>
          それぞれの「好き」を映せる海咲がいるから、
          <br />
          BarMisakiには、こんなにも多彩な個性が集まります。
        </p>
        <p>
          海咲を生み出してくださった VISION TOKYO・BLUESTELLA、
          <br />
          デザインを手がけた甘音しぃらさんへ、感謝と敬意を込めて。
        </p>
        <div className="misaki-links">
          <a href={externalLinks.misakiBooth} target="_blank" rel="noreferrer">
            海咲をBOOTHで見る <ArrowUpRight size={18} />
          </a>
          <a href={externalLinks.visionTokyoX} target="_blank" rel="noreferrer">
            VISION TOKYO のX <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
