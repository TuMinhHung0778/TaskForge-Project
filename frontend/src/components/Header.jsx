const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        TaskForge-DailyList
      </h1>

      <div className="flex items-center justify-center gap-6 text-muted-foreground">
        <img
          src="/552046-pepe.png"
          alt="pepe"
          className="w-29 h-29 object-contain"
        />

        <p className="text-lg">
          Súng không lau, súng mau han gỉ. Người không rèn, ý chí không cao.
        </p>

        <img
          src="/857799-pepesmoking.gif"
          alt="pepe smoking"
          className="w-19 h-19 object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
