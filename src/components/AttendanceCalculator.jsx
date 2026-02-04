import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AttendanceCalculator({ theme, toggleTheme }) {
  const [credit, setCredit] = useState(2);
  const [perWeek, setPerWeek] = useState(1);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayRequired, setDisplayRequired] = useState(0);
  const [displayAllowed, setDisplayAllowed] = useState(0);

  // Unique Icons for each section
  const icons = {
    header: ["🎯", "📊", "🎓", "🏫", "🧮"],
    credit: ["📚", "🎓", "📖", "📘", "📕"],
    classes: ["📅", "⏰", "🗓️", "⏳", "🕐"],
    calculate: ["🚀", "⚡", "✨", "🎯", "🔥"],
    total: ["📊", "📈", "📉", "📋", "🗒️"],
    required: ["✅", "🎯", "🏆", "⭐", "✨"],
    allowed: ["❌", "🚫", "⚠️", "⛔", "🚷"],
    status: ["📈", "📊", "🎯", "🏅", "🏆"],
    message: ["💡", "🌟", "🔔", "🎪", "🔮"],
    copy: ["📋", "📝", "📑", "📄", "🗂️"],
    reset: ["🔄", "⚡", "🎬", "🔁", "♻️"],
    heart: ["❤️", "💖", "💝", "💗", "💓"]
  };

  // Animated color palettes
  const colorPalettes = [
    { primary: "#3b82f6", secondary: "#06b6d4", accent: "#8b5cf6" },
    { primary: "#f97316", secondary: "#f59e0b", accent: "#ec4899" },
    { primary: "#10b981", secondary: "#22c55e", accent: "#84cc16" },
    { primary: "#8b5cf6", secondary: "#a855f7", accent: "#d946ef" },
    { primary: "#ec4899", secondary: "#f472b6", accent: "#f97316" }
  ];

  // Theme colors with animated palette
  const themeColors = theme === "light" ? {
    bg: `linear-gradient(135deg, ${colorPalettes[colorIndex].primary}15, ${colorPalettes[colorIndex].secondary}10)`,
    card: "#ffffff",
    text: "#1e293b",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    inputBg: "#ffffff",
    shadow: `0 20px 40px ${colorPalettes[colorIndex].primary}20`,
    headerGradient: `linear-gradient(135deg, ${colorPalettes[colorIndex].primary}, ${colorPalettes[colorIndex].secondary})`,
    statCard: "#f8fafc",
    progressTrack: "#e2e8f0",
    primary: colorPalettes[colorIndex].primary,
    secondary: colorPalettes[colorIndex].secondary,
    accent: colorPalettes[colorIndex].accent,
  } : {
    bg: `linear-gradient(135deg, ${colorPalettes[colorIndex].primary}10, ${colorPalettes[colorIndex].secondary}05)`,
    card: "#1e293b",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    border: "#334155",
    inputBg: "#334155",
    shadow: `0 20px 40px ${colorPalettes[colorIndex].primary}10`,
    headerGradient: `linear-gradient(135deg, ${colorPalettes[colorIndex].primary}, ${colorPalettes[colorIndex].secondary})`,
    statCard: "#0f172a",
    progressTrack: "#475569",
    primary: colorPalettes[colorIndex].primary,
    secondary: colorPalettes[colorIndex].secondary,
    accent: colorPalettes[colorIndex].accent,
  };

  // Rotate colors every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorPalettes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const calculate = () => {
    setIsCalculating(true);
    
    setDisplayTotal(0);
    setDisplayRequired(0);
    setDisplayAllowed(0);
    
    // Change color on calculation
    setColorIndex((prev) => (prev + 1) % colorPalettes.length);
    
    setTimeout(() => {
      const total = perWeek * 16;
      const required = Math.ceil(total * 0.75);
      const allowed = total - required;
      
      setResult({ total, required, allowed });
      setIsCalculating(false);
      
      // Animate numbers
      animateNumber(0, total, setDisplayTotal, 1000);
      animateNumber(0, required, setDisplayRequired, 1200);
      animateNumber(0, allowed, setDisplayAllowed, 1400);
    }, 800);
  };

  const animateNumber = (start, end, setter, duration) => {
    const startTime = Date.now();
    
    const update = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Elastic bounce effect
      const elasticProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(elasticProgress * (end - start) + start);
      setter(value);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setter(end);
      }
    };
    
    requestAnimationFrame(update);
  };

  const resetCalculator = () => {
    setResult(null);
    setDisplayTotal(0);
    setDisplayRequired(0);
    setDisplayAllowed(0);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 85) return "#10b981";
    if (percentage >= 75) return "#f59e0b";
    return "#ef4444";
  };

  const getProgressLabel = (percentage) => {
    if (percentage >= 85) return "Excellent 🏆";
    if (percentage >= 75) return "On Track 🎯";
    return "Needs Attention ⚠️";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: themeColors.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
      }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              fontSize: "24px",
              opacity: 0.1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          >
            {icons.credit[i % icons.credit.length]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.1 
        }}
        style={{
          width: "100%",
          maxWidth: "500px",
          background: themeColors.card,
          borderRadius: "28px",
          boxShadow: themeColors.shadow,
          overflow: "hidden",
          position: "relative",
          border: `2px solid ${themeColors.border}`,
        }}
      >
        {/* Animated Gradient Header */}
        <motion.div 
          style={{
            background: themeColors.headerGradient,
            padding: "35px 25px",
            position: "relative",
            overflow: "hidden",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 2,
          }}>
            <div>
              <motion.h1
                style={{
                  fontSize: "30px",
                  fontWeight: "900",
                  color: "white",
                  marginBottom: "10px",
                  lineHeight: 1.3,
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
                animate={{ 
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <motion.span
                  animate={{ 
                    rotate: [0, 15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity 
                  }}
                >
                  {icons.header[colorIndex]}
                </motion.span>
                HEC Attendance Calculator
              </motion.h1>
              <motion.p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "15px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>🎯</span> Plan your semester smartly
              </motion.p>
            </div>

            {/* Animated Theme Toggle */}
            <motion.button
              onClick={() => {
                toggleTheme();
                setColorIndex((prev) => (prev + 2) % colorPalettes.length);
              }}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(15px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "50px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              whileHover={{ 
                scale: 1.1,
                background: "rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <motion.span
                animate={{ 
                  rotate: theme === "light" ? [0, 360] : [360, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: "18px" }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </motion.span>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div style={{ padding: "30px" }}>
          
          {/* Input Section */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
            marginBottom: "30px",
          }}>
            {[
              { 
                label: "Credit Hours", 
                value: credit, 
                onChange: setCredit,
                options: [1, 2, 3, 4],
                iconSet: icons.credit
              },
              { 
                label: "Classes Per Week", 
                value: perWeek, 
                onChange: setPerWeek,
                options: [1, 2],
                iconSet: icons.classes
              }
            ].map((input, idx) => (
              <motion.div
                key={input.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: themeColors.text,
                }}>
                  <motion.span
                    animate={{ 
                      rotate: activeInput === input.label ? [0, 15, -15, 0] : 0,
                      scale: activeInput === input.label ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      fontSize: "24px",
                    }}
                  >
                    {input.iconSet[colorIndex]}
                  </motion.span>
                  {input.label}
                </label>
                <motion.select 
                  value={input.value} 
                  onChange={(e) => {
                    input.onChange(Number(e.target.value));
                    setActiveInput(input.label);
                    setTimeout(() => setActiveInput(null), 500);
                  }}
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    border: `3px solid ${themeColors.border}`,
                    background: themeColors.inputBg,
                    fontSize: "16px",
                    fontWeight: "600",
                    color: themeColors.text,
                    cursor: "pointer",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    borderColor: themeColors.primary,
                    boxShadow: `0 0 0 4px ${themeColors.primary}20`,
                  }}
                  whileHover={{
                    borderColor: themeColors.secondary,
                  }}
                >
                  {input.options.map(num => (
                    <option key={num} value={num}>
                      {num} {input.label.includes("Credit") ? `Credit Hour${num > 1 ? 's' : ''}` : `Time${num > 1 ? 's' : ''} / Week`}
                    </option>
                  ))}
                </motion.select>
              </motion.div>
            ))}
          </div>

          {/* Animated Calculate Button */}
          <motion.button
            onClick={calculate}
            disabled={isCalculating}
            style={{
              width: "100%",
              padding: "20px",
              border: "none",
              borderRadius: "16px",
              background: themeColors.headerGradient,
              color: "white",
              fontSize: "18px",
              fontWeight: "800",
              cursor: "pointer",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              boxShadow: `0 10px 30px ${themeColors.primary}40`,
              position: "relative",
              overflow: "hidden",
              letterSpacing: "0.5px",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 15px 40px ${themeColors.primary}60`,
            }}
            whileTap={{ scale: 0.97 }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Button shine effect */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              }}
              animate={{ x: ["0%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {isCalculating ? (
              <>
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                  style={{ fontSize: "24px" }}
                >
                  {icons.calculate[(colorIndex + 1) % icons.calculate.length]}
                </motion.div>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Calculating...
                </motion.span>
              </>
            ) : (
              <>
                <motion.span
                  animate={{ 
                    scale: [1, 1.4, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  style={{ fontSize: "24px" }}
                >
                  {icons.calculate[colorIndex]}
                </motion.span>
                Calculate Attendance
              </>
            )}
          </motion.button>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                style={{ overflow: "hidden" }}
              >
                {/* Celebration Emojis */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute",
                        fontSize: "24px",
                        left: `${Math.random() * 100}%`,
                        top: "50%",
                      }}
                      initial={{ y: -10, scale: 0, opacity: 0, rotate: 0 }}
                      animate={{ 
                        y: [-10, -150],
                        x: Math.random() * 150 - 75,
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 360, 720],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      {icons.header[i % icons.header.length]}
                    </motion.div>
                  ))}
                </motion.div>

                <div style={{
                  background: themeColors.statCard,
                  borderRadius: "20px",
                  padding: "30px",
                  border: `3px solid ${themeColors.border}`,
                  marginBottom: "20px",
                  position: "relative",
                  zIndex: 2,
                  boxShadow: `0 10px 30px ${themeColors.primary}15`,
                }}>
                  
                  {/* Stats Cards with Unique Icons */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginBottom: "30px",
                  }}>
                    {[
                      { 
                        label: "Total Classes", 
                        value: displayTotal, 
                        color: themeColors.primary,
                        gradient: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                        iconSet: icons.total
                      },
                      { 
                        label: "Required (75%)", 
                        value: displayRequired, 
                        color: "#10b981",
                        gradient: "linear-gradient(135deg, #10b981, #22c55e)",
                        iconSet: icons.required
                      },
                      { 
                        label: "Allowed Absences", 
                        value: displayAllowed, 
                        color: "#ef4444",
                        gradient: "linear-gradient(135deg, #ef4444, #f97316)",
                        iconSet: icons.allowed
                      }
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        style={{
                          background: themeColors.card,
                          padding: "25px 20px",
                          borderRadius: "18px",
                          textAlign: "center",
                          border: `3px solid ${themeColors.border}`,
                          position: "relative",
                          overflow: "hidden",
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: 0.1 + idx * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ 
                          scale: 1.08,
                          y: -8,
                          borderColor: stat.color,
                          boxShadow: `0 15px 30px ${stat.color}30`,
                        }}
                      >
                        {/* Card gradient overlay */}
                        <motion.div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: stat.gradient,
                          }}
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        
                        <motion.div
                          style={{
                            fontSize: "40px",
                            marginBottom: "20px",
                            display: "block",
                            background: stat.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 15, 0],
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: idx * 0.2 
                          }}
                        >
                          {stat.iconSet[(colorIndex + idx) % stat.iconSet.length]}
                        </motion.div>
                        
                        {stat.label === "Required (75%)" && (
                          <div 
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                              background: stat.gradient,
                              color: "white",
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              cursor: "help",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                            }}
                            onMouseEnter={() => setShowInfo(true)}
                            onMouseLeave={() => setShowInfo(false)}
                          >
                            ℹ️
                          </div>
                        )}
                        
                        <motion.div
                          style={{
                            fontSize: "42px",
                            fontWeight: "900",
                            marginBottom: "8px",
                            color: stat.color,
                            textShadow: `0 2px 10px ${stat.color}40`,
                          }}
                          key={stat.value}
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 15 
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        
                        <div style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: themeColors.textSecondary,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          opacity: 0.9,
                        }}>
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Section */}
                  <motion.div
                    style={{
                      background: themeColors.card,
                      padding: "25px",
                      borderRadius: "18px",
                      marginBottom: "25px",
                      border: `3px solid ${themeColors.border}`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Progress gradient border */}
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: themeColors.headerGradient,
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}>
                      <div style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: themeColors.text,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}>
                        <motion.span
                          animate={{ 
                            rotate: [0, 20, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{ fontSize: "24px" }}
                        >
                          {icons.status[colorIndex]}
                        </motion.span>
                        Attendance Status
                      </div>
                      <motion.div
                        style={{ 
                          fontSize: "28px", 
                          fontWeight: "900", 
                          color: getProgressColor((result.required/result.total)*100),
                          textShadow: `0 2px 10px ${getProgressColor((result.required/result.total)*100)}40`,
                        }}
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity 
                        }}
                      >
                        {((result.required/result.total)*100).toFixed(1)}%
                      </motion.div>
                    </div>

                    <motion.div
                      style={{
                        fontSize: "17px",
                        fontWeight: "800",
                        color: getProgressColor((result.required/result.total)*100),
                        marginBottom: "25px",
                        textAlign: "center",
                        padding: "12px",
                        background: theme === "light" ? "#f1f5f9" : "#0f172a",
                        borderRadius: "12px",
                        textShadow: `0 1px 3px ${getProgressColor((result.required/result.total)*100)}30`,
                      }}
                      animate={{ 
                        y: [0, -3, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      {getProgressLabel((result.required/result.total)*100)}
                    </motion.div>

                    <div style={{ position: "relative", marginBottom: "35px" }}>
                      <div style={{
                        height: "14px",
                        background: themeColors.progressTrack,
                        borderRadius: "7px",
                        overflow: "hidden",
                        position: "relative",
                      }}>
                        <motion.div
                          style={{
                            height: "100%",
                            borderRadius: "7px",
                            background: getProgressColor((result.required/result.total)*100),
                            position: "relative",
                            boxShadow: `0 0 20px ${getProgressColor((result.required/result.total)*100)}`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(result.required/result.total)*100}%` }}
                          transition={{ 
                            duration: 2, 
                            ease: "easeOut",
                            delay: 0.5 
                          }}
                        />
                      </div>
                      
                      {/* Pulsing Markers */}
                      <div style={{
                        position: "absolute",
                        top: "-26px",
                        left: "0",
                        right: "0",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 15px",
                      }}>
                        {[75, 85].map(percent => (
                          <motion.div
                            key={percent}
                            style={{
                              fontSize: "12px",
                              fontWeight: "800",
                              color: themeColors.textSecondary,
                              position: "relative",
                              padding: "4px 8px",
                              background: themeColors.card,
                              borderRadius: "6px",
                              border: `2px solid ${themeColors.border}`,
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              y: [0, -3, 0],
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: percent === 75 ? 0 : 0.5 
                            }}
                          >
                            {percent}% {percent === 75 ? "🎯" : "🏆"}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Legend with Emojis */}
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "25px",
                      fontSize: "13px",
                      color: themeColors.text,
                      flexWrap: "wrap",
                    }}>
                      {[
                        { color: "#ef4444", label: "Below 75%", icon: "⚠️" },
                        { color: "#f59e0b", label: "75-85%", icon: "👍" },
                        { color: "#10b981", label: "Above 85%", icon: "🏆" }
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "10px",
                            padding: "12px 18px",
                            background: themeColors.card,
                            borderRadius: "12px",
                            border: `2px solid ${themeColors.border}`,
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          whileHover={{
                            scale: 1.1,
                            borderColor: item.color,
                            boxShadow: `0 5px 15px ${item.color}30`,
                          }}
                        >
                          <motion.span
                            style={{
                              fontSize: "20px",
                            }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: idx * 0.2 
                            }}
                          >
                            {item.icon}
                          </motion.span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: item.color,
                              boxShadow: `0 0 10px ${item.color}`,
                            }} />
                            <span style={{ fontWeight: "800" }}>{item.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Message with Unique Icon */}
                  <motion.div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "22px",
                      background: theme === "light" 
                        ? `linear-gradient(135deg, ${themeColors.primary}15, ${themeColors.secondary}10)` 
                        : `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.secondary}15)`,
                      borderRadius: "16px",
                      marginBottom: "25px",
                      fontSize: "15px",
                      fontWeight: "700",
                      color: themeColors.primary,
                      border: `2px solid ${themeColors.border}`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{
                      borderColor: themeColors.primary,
                      boxShadow: `0 10px 25px ${themeColors.primary}20`,
                    }}
                  >
                    <motion.span
                      style={{ fontSize: "26px", flexShrink: 0 }}
                      animate={{ 
                        rotate: [0, 15, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {icons.message[colorIndex]}
                    </motion.span>
                    <span style={{ lineHeight: 1.5 }}>
                      {result.allowed > 3 
                        ? `🎉 You're safe! Can miss ${result.allowed} classes this semester 🎉`
                        : result.allowed > 0
                        ? `⚠️ Be careful! Only ${result.allowed} absence${result.allowed > 1 ? 's' : ''} allowed ⚠️`
                        : "🔥 Perfect attendance required! No absences allowed 🔥"
                      }
                    </span>
                  </motion.div>

                  {/* Action Buttons with Unique Icons */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                  }}>
                    <motion.button
                      style={{
                        padding: "18px",
                        border: "none",
                        borderRadius: "14px",
                        background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                        color: "white",
                        fontWeight: "800",
                        fontSize: "15px",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        letterSpacing: "0.5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      whileHover={{ 
                        scale: 1.07,
                        boxShadow: `0 10px 25px ${themeColors.primary}50`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const text = `🎓 HEC Attendance Results:\n${icons.total[colorIndex]} Total Classes: ${result.total}\n${icons.required[colorIndex]} Required (75%): ${result.required}\n${icons.allowed[colorIndex]} Allowed Absences: ${result.allowed}\n${icons.status[colorIndex]} Attendance: ${((result.required/result.total)*100).toFixed(1)}%`;
                        navigator.clipboard.writeText(text);
                        alert(`${icons.copy[colorIndex]} Results copied to clipboard!`);
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {icons.copy[colorIndex]}
                      </motion.span>
                      Copy Results
                    </motion.button>
                    
                    <motion.button
                      style={{
                        padding: "18px",
                        border: `3px solid ${themeColors.border}`,
                        borderRadius: "14px",
                        background: themeColors.inputBg,
                        color: themeColors.text,
                        fontWeight: "800",
                        fontSize: "15px",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      whileHover={{ 
                        scale: 1.07,
                        borderColor: themeColors.accent,
                        boxShadow: `0 10px 25px ${themeColors.accent}30`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetCalculator}
                    >
                      <motion.span
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {icons.reset[colorIndex]}
                      </motion.span>
                      Calculate Again
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Footer */}
          <motion.footer
            style={{
              marginTop: "25px",
              textAlign: "center",
              paddingTop: "25px",
              borderTop: `2px solid ${themeColors.border}`,
              position: "relative",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: themeColors.text,
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              animate={{ 
                y: [0, -4, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              Made with
              <motion.span
                style={{ 
                  display: "inline-block", 
                  fontSize: "20px",
                  background: themeColors.headerGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, 15, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                {icons.heart[colorIndex]}
              </motion.span>
              for Students
            </motion.div>
            <motion.p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: themeColors.textSecondary,
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>🎯</span> Helping you stay on track with HEC requirements
            </motion.p>
          </motion.footer>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5 }}
              style={{
                position: "absolute",
                top: "250px",
                right: "30px",
                background: themeColors.headerGradient,
                color: "white",
                padding: "12px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "600",
                width: "200px",
                zIndex: 100,
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>ℹ️</span>
                Minimum attendance required by HEC Pakistan
              </div>
              <div style={{
                position: "absolute",
                bottom: "-6px",
                right: "25px",
                width: "12px",
                height: "12px",
                background: themeColors.primary,
                transform: "rotate(45deg)",
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}