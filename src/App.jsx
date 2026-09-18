import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. 設定項目
// ==========================================

// ★ ここにGASでデプロイしたウェブアプリのURLを貼り付けてください ★
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxn7pzIzaD8bn68PnfZVvirN5HxdIjcIpB9hluFeM_mwF1P8933AW1bqBNd94x1Lkpb_Q/exec'; 

// 評価項目（5段階）
const QUESTIONS = [
  { id: 'speed', left: 'おそい', right: 'はやい' },
  { id: 'size', left: '小さく動く', right: '大きく動く' },
  { id: 'texture', left: 'なめらか', right: '力強い' },
  { id: 'difficulty', left: '簡単そう', right: 'むずかしそう' },
  { id: 'choreo', left: '使いたくない', right: '使いたい' }
];

// 動画リストのマスターデータ（40本分を定義します）
// ※ 実際は40本分のファイル名とIDをここに記述してください
const ALL_VIDEOS = [
  { id: 'v01', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch01_mesh.mp4' },
  { id: 'v02', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch02_mesh.mp4' },
  { id: 'v03', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch03_mesh.mp4' },
  { id: 'v04', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch04_mesh.mp4' },
  { id: 'v05', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch05_mesh.mp4' },
  { id: 'v06', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch06_mesh.mp4' },
  { id: 'v07', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch07_mesh.mp4' },
  { id: 'v08', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch08_mesh.mp4' },
  { id: 'v09', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch09_mesh.mp4' },
  { id: 'v10', url: '../visualization/gLH_sBM_c01_d17_mLH4_ch10_mesh.mp4' },
  { id: 'v11', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch01_mesh.mp4' },
  { id: 'v12', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch02_mesh.mp4' },
  { id: 'v13', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch03_mesh.mp4' },
  { id: 'v14', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch04_mesh.mp4' },
  { id: 'v15', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch05_mesh.mp4' },
  { id: 'v16', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch06_mesh.mp4' },
  { id: 'v17', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch07_mesh.mp4' },
  { id: 'v18', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch08_mesh.mp4' },
  { id: 'v19', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch09_mesh.mp4' },
  { id: 'v20', url: '../visualization/gLH_sBM_c01_d18_mLH4_ch10_mesh.mp4' },
  { id: 'v21', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch01_mesh.mp4' },
  { id: 'v22', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch02_mesh.mp4' },
  { id: 'v23', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch03_mesh.mp4' },
  { id: 'v24', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch04_mesh.mp4' },
  { id: 'v25', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch05_mesh.mp4' },
  { id: 'v26', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch06_mesh.mp4' },
  { id: 'v27', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch07_mesh.mp4' },
  { id: 'v28', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch08_mesh.mp4' },
  { id: 'v29', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch09_mesh.mp4' },
  { id: 'v30', url: '../visualization/gMH_sBM_c01_d22_mMH3_ch10_mesh.mp4' },
  { id: 'v31', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch01_mesh.mp4' },
  { id: 'v32', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch02_mesh.mp4' },
  { id: 'v33', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch03_mesh.mp4' },
  { id: 'v34', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch04_mesh.mp4' },
  { id: 'v35', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch05_mesh.mp4' },
  { id: 'v36', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch06_mesh.mp4' },
  { id: 'v37', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch07_mesh.mp4' },
  { id: 'v38', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch08_mesh.mp4' },
  { id: 'v39', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch09_mesh.mp4' },
  { id: 'v40', url: '../visualization/gMH_sBM_c01_d24_mMH3_ch10_mesh.mp4' }
];

// ==========================================
// 2. メインコンポーネント
// ==========================================
// 配列をランダムにシャッフルする関数（フィッシャー–イェーツアルゴリズム）
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  // 画面状態: 'intro' (属性入力) -> 'survey' (アンケート中) -> 'submitting' (送信中) -> 'thanks' (完了)
  const [step, setStep] = useState('intro');
  const [userInfo, setUserInfo] = useState({ experience: '', favoriteGenre: '', pattern: 'A' });
  const [surveyVideos, setSurveyVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);


  // --- 属性入力画面の処理 ---
  const handleStartSurvey = () => {
    if (!userInfo.experience || !userInfo.favoriteGenre) {
      alert('すべての項目を入力してください。');
      return;
    }

    // ★ 4つのパターンからランダムに1つを決定する
    //const patterns = ['A', 'B', 'C', 'D'];
    //const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

    // 回答が極端に少ない場合のテスト用に、特定のパターンを強制する場合は以下の行をコメントアウト解除してください
    const patterns = ['A'];
    const randomPattern = 'A'; // テスト用にパターンAを強制

    // 決定したパターンを userInfo に保存しておく（後でGASに送るため）
    const updatedUserInfo = { ...userInfo, pattern: randomPattern };
    setUserInfo(updatedUserInfo);

    // ランダムに決まったパターンに応じて動画を抽出
    let selectedVideos = [];
    if (randomPattern === 'A') selectedVideos = ALL_VIDEOS.slice(0, 20);
    else if (randomPattern === 'B') selectedVideos = ALL_VIDEOS.slice(20, 40);
    else if (randomPattern === 'C') selectedVideos = [...ALL_VIDEOS.slice(0, 10), ...ALL_VIDEOS.slice(20, 30)];
    else if (randomPattern === 'D') selectedVideos = [...ALL_VIDEOS.slice(10, 20), ...ALL_VIDEOS.slice(30, 40)];

    const shuffledVideos = shuffleArray(selectedVideos);
    setSurveyVideos(shuffledVideos);
    setStep('survey');
  };


  // --- アンケート画面の処理 ---
  // 全項目の回答が完了したかチェックし、自動遷移する
  useEffect(() => {
    if (step !== 'survey' || surveyVideos.length === 0) return;

    const currentVideoId = surveyVideos[currentVideoIndex].id;
    const currentAnswers = answers[currentVideoId];

    if (currentAnswers && Object.keys(currentAnswers).length === QUESTIONS.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentVideoIndex < surveyVideos.length - 1) {
          setCurrentVideoIndex(prev => prev + 1);
        } else {
          submitData();
        }
        setIsTransitioning(false);
      }, 400); // 0.4秒のディレイでスッと切り替わる
    }
  }, [answers, currentVideoIndex, surveyVideos, step]);

  const handleScoreSelect = (questionId, score) => {
    const currentVideoId = surveyVideos[currentVideoIndex].id;
    setAnswers(prev => ({
      ...prev,
      [currentVideoId]: {
        ...(prev[currentVideoId] || {}),
        [questionId]: score
      }
    }));
  };

  // --- 送信処理 ---
  const submitData = async () => {
    setStep('submitting');
    
    // 簡易的な一意のIDを生成
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    const payload = { userId, userInfo, answers };

    try {
      if (GAS_WEB_APP_URL === 'YOUR_GAS_WEB_APP_URL_HERE') {
        console.warn('GAS URLが設定されていません。コンソールに結果を出力します:', payload);
        setTimeout(() => setStep('thanks'), 1500); // テスト用の擬似待機
        return;
      }

      const response = await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        setStep('thanks');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('送信エラー:', error);
      alert('通信エラーが発生しました。時間を置いて再度お試しください。');
      setStep('survey'); // エラー時はアンケート画面に戻す
    }
  };

  // ==========================================
  // レンダリング
  // ==========================================

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ダンスモーション評価アンケート</h1>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            このアンケートでは、生成された3Dキャラクターのダンスの動きを見て、どのような印象を受けるかお答えください。全20本の動画を評価していただきます。
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ダンス経験年数</label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                value={userInfo.experience}
                onChange={e => setUserInfo({...userInfo, experience: e.target.value})}
              >
                <option value="">選択してください</option>
                <option value="none">未経験</option>
                <option value="less_1">1年未満</option>
                <option value="1_to_3">1年〜3年</option>
                <option value="3_to_5">3年〜5年</option>
                <option value="over_5">5年以上</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">最も好きな（または得意な）ジャンル</label>
              <p className="text-2xs text-gray-500 mb-2">※無い場合は「なし」を記入してください</p>
              <input 
                type="text" 
                placeholder="例: HIPHOP, K-POP, Jazzなど"
                className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500"
                value={userInfo.favoriteGenre}
                onChange={e => setUserInfo({...userInfo, favoriteGenre: e.target.value})}
              />
            </div>

            <button 
              onClick={handleStartSurvey}
              className="w-full mt-6 bg-black text-white font-bold py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              アンケートを開始する
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'submitting') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="text-gray-600 font-medium">回答を送信中...</p>
        </div>
      </div>
    );
  }

  if (step === 'thanks') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ご協力ありがとうございました！</h2>
          <p className="text-gray-600">すべての回答が正常に送信されました。このウィンドウは閉じて構いません。</p>
        </div>
      </div>
    );
  }

// アンケート画面
  const currentVideo = surveyVideos[currentVideoIndex];
  const currentAnswers = answers[currentVideo?.id] || {};

  return (
    <div className="min-h-screen bg-gray-100 pb-12 pt-6 px-4">
      {/* コンテナの幅を確実に max-w-2xl に制限し、中央寄せ */}
      <div className={`max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* プログレスバー */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>{currentVideoIndex + 1} / {surveyVideos.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentVideoIndex) / surveyVideos.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 3Dメッシュ動画エリア：aspect-videoを削除し、高さを明示的に固定して全身を収める */}
        <div className="w-full bg-gray-100 rounded-lg mb-8 flex items-center justify-center h-[350px] sm:h-[450px] overflow-hidden relative z-0">
          <video 
            key={currentVideo?.id}
            ref={videoRef}
            src={currentVideo?.url} 
            autoPlay 
            loop 
            muted 
            playsInline
            // スマホ表示時 (デフォルト): scale-[1.5] (1.5倍)
            // PC表示時 (sm:): scale-[1.25] (1.25倍)
            className="w-full h-full object-contain scale-[1.5] sm:scale-[1.5] transition-transform duration-300"
          />
        </div>

        {/* 評価ボタンエリア */}
        <div className="space-y-6 sm:space-y-8">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="flex flex-col space-y-3">
              <div className="flex justify-between text-sm text-gray-700 font-bold px-1">
                <span>(1) {q.left}</span>
                <span>{q.right} (5)</span>
              </div>
              <div className="flex justify-between gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5].map(score => {
                  const isSelected = currentAnswers[q.id] === score;
                  return (
                    <button
                      key={score}
                      type="button"
                      onClick={() => handleScoreSelect(q.id, score)}
                      // transform と scale を追加してタップ時の「押し込み感」を強調
                      className={`flex-1 py-3 text-base sm:text-lg font-bold rounded-lg border-2 transition-all duration-150 touch-manipulation select-none transform
                        ${isSelected 
                          ? 'bg-gray-900 border-gray-900 text-white shadow-inner scale-95 ring-2 ring-offset-1 ring-gray-900' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-200 active:scale-95'
                        }`}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}