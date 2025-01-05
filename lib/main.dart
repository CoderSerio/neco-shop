import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'pages/home_page.dart';
import 'pages/discover_page.dart';
import 'pages/message_page.dart';
import 'pages/profile_page.dart';
import 'pages/settings_page.dart';
import 'pages/splash_screen.dart';

void main() {
  runApp(const MyApp());
}

Page<dynamic> _buildTransitionPage({
  required Widget child,
  required GoRouterState state,
}) {
  return CustomTransitionPage<void>(
    key: state.pageKey,
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const curve = Curves.easeInOut;
      final opacityAnimation = CurveTween(curve: curve).animate(animation);

      return FadeTransition(
        opacity: opacityAnimation,
        child: child,
      );
    },
  );
}

final _router = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      pageBuilder: (context, state) => _buildTransitionPage(
        child: const SplashScreen(),
        state: state,
      ),
    ),
    ShellRoute(
      builder: (context, state, child) => MainPage(child: child),
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const SizedBox(),
        ),
        GoRoute(
          path: '/discover',
          builder: (context, state) => const SizedBox(),
        ),
        GoRoute(
          path: '/message',
          pageBuilder: (context, state) => _buildTransitionPage(
            child: const MessagePage(),
            state: state,
          ),
        ),
        GoRoute(
          path: '/profile',
          pageBuilder: (context, state) => _buildTransitionPage(
            child: const ProfilePage(),
            state: state,
          ),
        ),
        GoRoute(
          path: '/settings',
          pageBuilder: (context, state) => _buildTransitionPage(
            child: const SettingsPage(),
            state: state,
          ),
        ),
      ],
    ),
  ],
);
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.pink),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      // Set white background for status bar
      builder: (context, child) {
        return Container(
          color: Colors.white,
          child: SafeArea(
            child: child!,
          ),
        );
      },
    );
  }
}

class MainPage extends StatefulWidget {
  final Widget child;
  const MainPage({super.key, required this.child});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  int _previousIndex = 0;
  final List<Widget> _pages = [
    const HomePage(),
    const DiscoverPage(),
    const MessagePage(),
    const ProfilePage(),
    const SettingsPage(),
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  int _getCurrentIndex(BuildContext context) {
    final String location = GoRouterState.of(context).uri.path;
    switch (location) {
      case '/':
        return 0;
      case '/discover':
        return 1;
      case '/message':
        return 2;
      case '/profile':
        return 3;
      case '/settings':
        return 4;
      default:
        return 0;
    }
  }

  void _onItemTapped(BuildContext context, int index) {
    final currentIndex = _getCurrentIndex(context);
    if (currentIndex == index) return;

    _previousIndex = currentIndex;
    _controller.forward(from: 0.0);

    switch (index) {
      case 0:
        context.go('/');
        break;
      case 1:
        context.go('/discover');
        break;
      case 2:
        context.go('/message');
        break;
      case 3:
        context.go('/profile');
        break;
      case 4:
        context.go('/settings');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentIndex = _getCurrentIndex(context);

    return Scaffold(
      body: IndexedStack(
        index: currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            currentIndex: currentIndex,
            onTap: (index) => _onItemTapped(context, index),
            items: [
              _buildAnimatedNavItem(Icons.home, '首页', 0, currentIndex),
              _buildAnimatedNavItem(Icons.explore, '发现', 1, currentIndex),
              _buildAnimatedNavItem(Icons.message, '消息', 2, currentIndex),
              _buildAnimatedNavItem(Icons.person, '我的', 3, currentIndex),
              _buildAnimatedNavItem(Icons.settings, '设置', 4, currentIndex),
            ],
          );
        },
      ),
    );
  }

  BottomNavigationBarItem _buildAnimatedNavItem(
    IconData icon,
    String label,
    int index,
    int currentIndex,
  ) {
    final isSelected = index == currentIndex;
    final wasSelected = index == _previousIndex;

    Animation<double> animation;
    if (isSelected) {
      animation = Tween<double>(begin: 0.8, end: 1.2).animate(
        CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
        ),
      );
    } else if (wasSelected) {
      animation = Tween<double>(begin: 1.2, end: 1.0).animate(
        CurvedAnimation(
          parent: _controller,
          curve: const Interval(0.4, 1.0, curve: Curves.easeIn),
        ),
      );
    } else {
      animation = const AlwaysStoppedAnimation(1.0);
    }

    return BottomNavigationBarItem(
      icon: ScaleTransition(
        scale: animation,
        child: Icon(icon),
      ),
      label: label,
    );
  }
}
