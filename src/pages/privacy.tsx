import Link from "next/link";

const MinitodoSpan = () => {
  const MINITODO_URL = "https://minitodo.dev";
  return (
    <span className="font-bold underline">
      <Link href={MINITODO_URL}>minitodo.dev</Link>
    </span>
  );
};

const BarisbllSpan = () => {
  const BARISBLL_URL = "https://github.com/barisbll";
  return (
    <span className="font-bold underline">
      <Link href={BARISBLL_URL}>barisbll</Link>
    </span>
  );
};

const Privacy = () => {
  return (
    <div className="w-full px-10 md:px-16 xl:px-28 2xl:px-48">
      <h1 className="mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Privacy Policy
      </h1>
      <p className="pt-1 leading-7 [&:not(:first-child)]:mt-4">
        <BarisbllSpan /> operates the site <MinitodoSpan /> to provide services
        including (todo item creation, read, update and delete)
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        <BarisbllSpan /> is committed to protecting users&apos; privacy and
        addressing potential privacy concerns. The following information has
        been posted to help you, the consumer, understand what private
        information we collect and how your information is used.
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Types of private information collected
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        To best serve your needs, we collect the following types of information
        when you visit <MinitodoSpan />
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Personal Information
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        We collect the following personal information from our users:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Name</li>
        <li>Email Address</li>
        <li>Profile Image Of The Connected Accound</li>
        <li>Todo Items Entered By The User</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        You can always choose to provide less information. However, omitting
        some of this personal information may limit your ability to access all
        the benefits of our website and services. For example, if you decide to
        use the application as a guest (after clicking &quot;Just Wonder
        👀&quot; button), your todo items will only be stored in the device you
        are using, and you will not be able to fetch them using other devices.
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Automatically Collected Information
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        We automatically collect data on how our users visit (enter website
        here), such as your IP address, location, browser, browser language,
        operating system, device identifiers, and cookies. However, we do not
        store such data on our databases. They are automatically written in our
        logs for troubleshooting purposes.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        Our website currently uses cookies to enhance its functionality. You may
        disable cookies in your web browser, but this may limit your ability to
        access <MinitodoSpan />.
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Authentication Providers
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        If you&apos;ve logged in to <MinitodoSpan /> using one of our
        authentication providers (google or github), we collect some information
        coming from those providers. Depending on the authentication provider,
        this can include your username, name, email address, friends list, and
        more. In addition, we collect demographic data when users interact with{" "}
        <BarisbllSpan /> social media accounts.
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Policy on collecting sensitive personal information
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        <BarisbllSpan /> does not gather any of your sensitive personal
        information, such as your social security number, driver&apos;s license
        number, race, ethnicity, religion, health metrics, political
        associations, or details on your criminal background.
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        How the information collected is used
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        We only use your personal information to help you utilize everything{" "}
        <BarisbllSpan /> has to offer. This includes:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Creating and maintaining an account with us</li>
        <li>Creating and maintaining todo items.</li>
      </ul>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Length of time personal information is stored
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        We store your personal information for an unknown amount of time. You
        may delete all your todo items, they will be deleted from our database
        too. However, currently we do not support deleting account
        functionality.
      </p>
      <h3 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Additional questions
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-4">
        If you have questions regarding this privacy policy, feel free to
        contact us at barisbll.dev@gmail.com. A <BarisbllSpan /> representative
        will respond to your privacy policy questions as soon as possible.
      </p>

      <div className="mt-48">{"  "}</div>
    </div>
  );
};

export default Privacy;
