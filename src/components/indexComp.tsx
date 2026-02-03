import { ensureCompletedChallenges } from "../utils/ensureCompletedChallenges";
import useUsername from "../hooks/useUsername";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { username } = useUsername();

  useEffect(() => {
    if (username) {
      ensureCompletedChallenges(username);
    }
  }, [username]);

  const features = [
    {
      id: "01",
      title: "Normal Quiz",
      description: "Master your knowledge across thousands of questions. Learn at your own pace.",
    },
    {
      id: "02",
      title: "PvP Battles",
      description: "Real-time competitive matches against players worldwide. Prove your speed.",
    },
    {
      id: "03",
      title: "Leaderboard",
      description: "Rise through the global ranks. Compete daily for the top spot.",
    }
  ];

  const stats = [
    { label: "Active Players", value: "2.5M+" },
    { label: "Questions", value: "100K+" },
    { label: "Countries", value: "180+" },
    { label: "Daily Battles", value: "50K+" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <nav className="fixed w-full z-50 px-6 py-6 backdrop-blur-md bg-slate-950/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              AbdullThon
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/signin" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[300px] md:h-[500px] bg-emerald-500/10 blur-[80px] md:blur-[120px] rounded-full opacity-30 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs md:text-sm font-medium mb-6 md:mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Premium Quiz Platform
          </div> */}

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1]">
            Master The Art of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 block sm:inline mt-2 sm:mt-0">
              Computational Thinking
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Join the elite community of developers and thinkers. Challenge friends, climb the leaderboard, and sharpen your mind.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 md:mb-24 px-4">
            <Link to="/categories" className="w-full sm:w-auto">
              <Button size="lg" className="h-12 md:h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-base md:text-lg w-full transition-all duration-300 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.4)] hover:-translate-y-1">
                Start Quiz
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 border-slate-700 text-slate-300 hover:text-white hover:bg-white/5 rounded-full text-base md:text-lg w-full sm:w-auto backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
              View Demo
            </Button>
          </div>

          <div className="relative w-full max-w-3xl mx-auto perspective-1000 px-2 sm:px-0">
            <div className="relative transform rotate-x-6 sm:rotate-x-12 scale-100 sm:scale-90 opacity-90 hover:rotate-x-0 hover:scale-100 transition-all duration-700 ease-out">
              <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-slate-950/50 p-3 md:p-4 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="ml-2 md:ml-4 text-[10px] md:text-xs text-slate-500 font-mono">quiz_runner.exe</div>
                </div>
                <div className="p-4 md:p-8 font-mono text-left">
                  <div className="text-emerald-400 mb-2 text-xs md:text-base">$ init_challenge --difficulty=hard</div>
                  <div className="text-slate-300 mb-4 text-xs md:text-base">Loading question bank... <span className="text-emerald-500">Done (0.4s)</span></div>

                  <div className="bg-slate-950 rounded-lg p-4 md:p-6 border border-slate-800 mb-2 md:mb-6">
                    <div className="text-slate-400 text-xs md:text-sm mb-2">Question 1/10</div>
                    <div className="text-white text-sm md:text-lg mb-4 md:mb-6">What is the time complexity of a binary search algorithm?</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-emerald-500/10 border border-emerald-500/50 rounded text-emerald-400 text-xs md:text-sm">A) O(log n)</div>
                      <div className="p-2 md:p-3 bg-slate-800/50 border border-slate-800 rounded text-slate-400 text-xs md:text-sm">B) O(n)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl md:blur-3xl -z-10 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 border-y border-white/5 bg-white/[0.02]">
          {stats.map((stat, index) => (
            <div key={index} className="py-8 text-center group hover:bg-emerald-500/[0.02] transition-colors">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="px-6 py-32 relative bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/5 pb-8">
            <h2 className="text-4xl md:text-5xl font-bold max-w-xl leading-tight">
              Designed for the <span className="text-emerald-400">Obsessed.</span>
            </h2>
            <p className="text-slate-400 max-w-sm mt-6 md:mt-0">
              Three specific ways to measure your growth and dominate the leaderboard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 cursor-default"
              >
                <div className="text-7xl font-black text-white/10 mb-8 group-hover:text-emerald-500/30 transition-colors duration-500 font-mono">
                  {feature.id}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <div className="w-full h-px bg-white/5 group-hover:bg-emerald-500/30 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Ready to Begin?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            Join a community of millions. Your first challenge awaits.
          </p>
          <Link to="/signup">
            <Button size="lg" className="h-16 px-12 bg-white text-slate-950 hover:bg-emerald-400 hover:text-white rounded-full text-xl font-bold transition-all duration-300">
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="px-6 py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold text-white">
              AbdullThon
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 AbdullThon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
